import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoUrl from "../assets/images/Logo.png";
import authApiClient from "../services/auth-api-client"; // uses your configured baseURL + JWT if any

// Replace with your logo path
const Logo = () => (
  <div className="flex items-center space-x-2">
    <img
      src={logoUrl}
      alt="HCH Logo"
      className="w-18 h-auto" // Adjust width and height as needed
    />
    <span className="text-2xl font-bold text-gray-800">HCH</span>
  </div>
);

// Hamburger Menu Icon
const MenuIcon = () => (
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    ></path>
  </svg>
);

// Close Icon
const CloseIcon = () => (
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);

// ------- small helpers for avatar/initials -------
const initials = (first, last) => {
  const a = (first || "").trim()[0] || "";
  const b = (last || "").trim()[0] || "";
  return (a + b || "U").toUpperCase();
};
const absUrl = (url, base) => {
  try {
    return new URL(url, base).href;
  } catch {
    return url;
  }
};

// Robust admin check (match your AdminRoute logic)
const isAdminUser = (u) =>
  !!(
    u &&
    (u.is_staff ||
      u.is_superuser ||
      u.is_admin ||
      u?.role === "Admin" ||
      u?.groups?.includes?.("Admin") ||
      u?.groups?.some?.((g) => (g?.name || g) === "Admin"))
  );

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- auth + profile state (NEW) ---
  const [isAuthed, setIsAuthed] = useState(false);
  const [me, setMe] = useState(null); // { first_name, last_name, avatar }
  useEffect(() => {
    const hasTokens = !!localStorage.getItem("authTokens");
    setIsAuthed(hasTokens);

    if (hasTokens) {
      const base = authApiClient?.defaults?.baseURL || "";
      const mePath = "/auth/users/me/";
      authApiClient
        .get(mePath)
        .then(({ data }) => setMe(data))
        .catch(() => {
          // ignore, we’ll just show initials placeholder
        });
    }
  }, []);
  const avatarUrl = me?.avatar
    ? absUrl(me.avatar, authApiClient?.defaults?.baseURL || "")
    : `https://placehold.co/36x36/EBF4FA/083d41?text=${encodeURIComponent(
        initials(me?.first_name, me?.last_name)
      )}`;

  const dashboardPath = isAdminUser(me) ? "/admin" : "/dashboard";
  const dashboardLabel = isAdminUser(me) ? "Admin" : "Dashboard";

  const navLinks = [
    { text: "HOME", path: "/" },
    { text: "ABOUT US", path: "/about" },
    { text: "SERVICE", path: "/service" },
    { text: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      <nav className="bg-white font-sans shadow-md relative z-30">
        <div className="w-full bg-green-500 h-2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex-shrink-0 z-20">
              <div
                className="bg-white pl-4 md:pl-8 pr-8 md:pr-12"
                style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
              >
                <Logo />
              </div>
            </div>

            {/* Main container for navigation and call to action */}
            <div className="flex items-center justify-end flex-grow">
              {/* Background angle */}
              <div
                className="absolute left-0 right-0 h-24 bg-[#083d41] "
                style={{
                  clipPath: "polygon(15% 0, 100% 0, 100% 100%, 5% 100%)",
                  zIndex: 1,
                }}
              ></div>

              <div className="relative z-10 flex items-center justify-end w-full">
                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center space-x-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.text}
                      href={link.path}
                      className="text-white hover:text-green-400 transition duration-300 font-semibold text-sm tracking-wider"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>

                {/* RIGHT SIDE: Auth area (desktop) */}
                <div className="hidden lg:flex items-center ml-6 pl-6 border-l border-gray-600 space-x-3">
                  {!isAuthed ? (
                    <>
                      {/* Logged OUT: show Sign In / Sign Up (unchanged) */}
                      <button className="text-green-400 font-semibold text-sm py-2 px-4 rounded-md border border-green-400 hover:bg-green-400 hover:text-white transition-colors duration-300">
                        <Link to="/signin">Sign In</Link>
                      </button>
                      <button className="bg-green-500 text-white font-semibold text-sm py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
                        <Link to="/signup">Sign Up</Link>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Logged IN: show Dashboard + Avatar */}
                      <Link
                        to={dashboardPath}
                        className="bg-green-500 text-white font-semibold text-sm py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
                      >
                        {dashboardLabel}
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="ml-2 inline-flex items-center"
                        title={`${me?.first_name || ""} ${me?.last_name || ""}`.trim() || "Profile"}
                      >
                        <img
                          src={avatarUrl}
                          alt="Profile"
                          className="w-9 h-9 rounded-full border-2 border-white object-cover"
                        />
                      </Link>
                    </>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="inline-flex items-center justify-center p-3 rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu Sidebar --- */}

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[90%] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          {/* Menu Header */}
          <div className="flex items-center justify-between mb-8">
            {/* A slightly smaller logo for the sidebar */}
            <div className="flex-shrink-0 z-20">
              <div
                className="bg-white md:pl-8 pr-8 md:pr-12"
                style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
              >
                <Logo />
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="bg-green-500 rounded-full p-2 text-white hover:bg-green-600 flex items-center justify-center"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.text} className="border-b last:border-b-0">
                <a
                  href={link.path}
                  className="flex items-center justify-between py-4 text-gray-800 hover:text-green-500 font-bold transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <span className="ml-4 uppercase tracking-wider text-sm">
                      {link.text}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE (mobile): Auth area */}
        <div className="p-5 border-t">
          {!isAuthed ? (
            <div className="flex flex-col space-y-3">
              {/* Logged OUT: Sign In / Sign Up (unchanged styles) */}
              <button className="w-full text-green-500 font-semibold text-sm py-3 px-4 rounded-md border border-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300">
                <Link to="/signin">Sign In</Link>
              </button>
              <button className="w-full bg-green-500 text-white font-semibold text-sm py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              {/* Logged IN: Avatar + Dashboard */}
              <div className="flex items-center gap-3">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />
                <div className="text-sm font-semibold text-gray-800">
                  {(me?.first_name || "") + " " + (me?.last_name || "")}
                </div>
              </div>
              <Link
                to={dashboardPath}
                className="ml-4 bg-green-500 text-white font-semibold text-xs py-2 px-3 rounded-md hover:bg-green-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {dashboardLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
