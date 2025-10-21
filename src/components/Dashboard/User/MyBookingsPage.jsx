import React, { useState, useEffect } from "react";
import authApiClient from "../../../services/auth-api-client";

// --- SVG Icon Components ---
const CalendarIcon = () => (
  <svg
    className="w-5 h-5 mr-2 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const DotsVerticalIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 5v.01M12 12v.01M12 19v.01"
    />
  </svg>
);

// --- Helpers: API -> UI shape (no design change) ---
const toDateOnly = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`; // matches your existing "2025-10-15" style
};

const formatPrice = (amount) => {
  const n = Number(amount);
  if (!Number.isFinite(n)) return String(amount ?? "");
  // your cards display "$150" style (no decimals)
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
};

// Normalize API status strings to your UI's labels
const statusToUiLabel = (status = "") => {
  const s = String(status).toLowerCase().trim();
  if (["completed", "paid", "delivered", "fulfilled"].includes(s))
    return "Completed";
  if (["cancelled", "canceled", "failed", "refunded"].includes(s))
    return "Cancelled";
  // "Not Paid", "pending", "processing", "confirmed", "scheduled" etc.
  return "Upcoming";
};

// Convert /api/v1/orders/ item -> your booking card row
const apiOrderToBooking = (o = {}) => ({
  id:
    typeof o.id === "string"
      ? `#${o.id.slice(0, 8).toUpperCase()}`
      : `#${o.id}`,
  date: toDateOnly(o.created_at ?? o.scheduled_date),
  service: o?.items?.[0]?.product?.name ?? "Service",
  status: statusToUiLabel(o.status),
  price: formatPrice(o.total_price ?? 0),
  team: [], // API doesn't return team; keep empty (your UI already hides the section if empty)
});

// This would be part of your main UserDashboard component
const UserDashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Icons would be imported here...
  const DashboardIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
  const BookingsIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  );
  const ProfileIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
  const MessagesIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
  const LogoutIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
  const MenuIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const navItems = [
    { icon: <DashboardIcon />, label: "Dashboard" },
    { icon: <BookingsIcon />, label: "My Bookings", active: true },
    { icon: <ProfileIcon />, label: "Profile" },
    { icon: <MessagesIcon />, label: "Messages" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#083d41] text-white">
      <div className="p-6 text-center border-b border-gray-700">
        <h1 className="text-3xl font-bold">HCH</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <a
            href="#"
            key={item.label}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              item.active ? "bg-green-500" : "hover:bg-gray-700"
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <a
          href="#"
          className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700"
        >
          <LogoutIcon />
          <span className="ml-3">Logout</span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
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
      <div className="hidden lg:fixed lg:inset-y-0 lg:w-64 lg:flex lg:flex-col">
        <SidebarContent />
      </div>
      <main className="lg:pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white shadow-sm lg:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500"
            >
              <MenuIcon />
            </button>
            <h1 className="text-2xl font-bold text-[#083d41]">HCH</h1>
            <div className="w-6"></div>
          </div>
        </header>
        <div className="flex-grow p-6 sm:p-8">{children}</div>
      </main>
    </div>
  );
};

// --- My Bookings Page Component ---
const MyBookingsPage = () => {
  const [filter, setFilter] = useState("All");

  const allBookings = [
    {
      id: "#1234",
      date: "2025-10-15",
      service: "Deep House Clean",
      status: "Upcoming",
      price: "$150",
      team: [
        "https://placehold.co/40x40/EBF4FA/333333?text=A",
        "https://placehold.co/40x40/A0DEFF/333333?text=B",
      ],
    },
    {
      id: "#1233",
      date: "2025-09-28",
      service: "Office Cleaning",
      status: "Completed",
      price: "$250",
      team: ["https://placehold.co/40x40/CAF4FF/333333?text=C"],
    },
    {
      id: "#1232",
      date: "2025-09-10",
      service: "Kitchen Cleaning",
      status: "Completed",
      price: "$80",
      team: ["https://placehold.co/40x40/EBF4FA/333333?text=A"],
    },
    {
      id: "#1231",
      date: "2025-08-22",
      service: "Window Cleaning",
      status: "Cancelled",
      price: "$120",
      team: [],
    },
    {
      id: "#1230",
      date: "2025-07-15",
      service: "Deep House Clean",
      status: "Completed",
      price: "$150",
      team: [
        "https://placehold.co/40x40/A0DEFF/333333?text=B",
        "https://placehold.co/40x40/5AB2FF/333333?text=D",
      ],
    },
  ];

  const filteredBookings = allBookings.filter(
    (booking) => filter === "All" || booking.status === filter
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filters = ["All", "Upcoming", "Completed", "Cancelled"];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#083d41]">My Bookings</h2>
          <p className="text-gray-500">View and manage your service history.</p>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-lg transition-colors">
          + Book New Service
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                filter === f
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Cards */}
      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#083d41]">
                  {booking.service}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <CalendarIcon />
                  <span>{booking.date}</span>
                  <span className="mx-2">|</span>
                  <span>ID: {booking.id}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClass(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
                <span className="text-xl font-bold text-[#083d41]">
                  {booking.price}
                </span>
                <button className="text-gray-500 hover:text-gray-800">
                  <DotsVerticalIcon />
                </button>
              </div>
            </div>
            {booking.team.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  Assigned Team:
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {booking.team.map((memberImg, index) => (
                      <img
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        src={memberImg}
                        alt={`Team member ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No bookings found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// To use this, you'd render it inside the main layout like this:
// export default function App() {
//     return (
//         <UserDashboardLayout>
//             <MyBookingsPage />
//         </UserDashboardLayout>
//     );
// }
// For this example, we export the component directly.
export default MyBookingsPage;
