import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {
  House,
  ClipboardCheck,
  CircleUserRound,
  LogOut,
  Menu,
  GalleryVerticalEnd,
} from "lucide-react";

const LogoutIcon = () => <LogOut />;

const Sidebar = ({ activePage, setActivePage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      if (typeof window !== "undefined") {
        if (Array.isArray(window.dataLayer)) {
          window.dataLayer.push({
            event: "logout",
            category: "auth",
            action: "logout",
            label: "sidebar-admin",
          });
        }
        if (window.umami?.track) window.umami.track("logout");
        if (window.analytics?.track) window.analytics.track("Logout");
      }
    } catch (_) {
      /* no-op */
    }
    setSidebarOpen(false);
    try {
      const maybe = logoutUser?.();
      if (maybe && typeof maybe.then === "function") {
        await maybe; // handle promise-based logout implementations
      }
    } finally {
      sessionStorage.removeItem("cart_id");
      // Replace history so back button can't return to an authed page
      navigate("/", { replace: true });
    }
  };

  const navItems = [
    { icon: <House />, label: "Dashboard", path: "/admin" },
    {
      icon: <ClipboardCheck />,
      label: "Manage Bookings",
      path: "/admin/manage-bookings",
    },
    { icon: <CircleUserRound />, label: "Users", path: "/admin/users-page" },
    {
      icon: <GalleryVerticalEnd />,
      label: "Services",
      path: "/admin/services-page",
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#083d41] text-white">
      <div className="p-6 text-center border-b border-gray-700">
        <a href="https://home-care-hub-frontend.vercel.app/">
          <h1 className="text-3xl font-bold">Home Care</h1>
        </a>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `w-full flex items-center px-4 py-3 rounded-lg transition-colors text-left ${
                isActive ? "bg-green-500" : "hover:bg-gray-700"
              }`
            }
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          type="button"
          onClick={handleLogoutClick}
          aria-label="Log out"
          title="Log out"
          data-testid="logout-button"
          data-cy="logout-button"
          data-event="logout"
          data-event-context="sidebar-admin"
          className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 text-left"
        >
          <LogoutIcon />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative w-72 h-full">
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:inset-y-0 lg:w-64 lg:flex lg:flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 text-gray-500 lg:hidden bg-white p-2 rounded-md shadow-md"
      >
        <Menu />
      </button>
    </>
  );
};

export default Sidebar;
