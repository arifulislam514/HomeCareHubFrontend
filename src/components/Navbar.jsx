import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoUrl from "../assets/images/Logo.png";
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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
              {/* This div creates the dark background with the angled cut */}
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

                {/* Sign In and Sign Up Section */}
                <div className="hidden lg:flex items-center ml-6 pl-6 border-l border-gray-600 space-x-3">
                  <button className="text-green-400 font-semibold text-sm py-2 px-4 rounded-md border border-green-400 hover:bg-green-400 hover:text-white transition-colors duration-300">
                    <Link to="/signin">Sign In</Link>
                  </button>
                  <button className="bg-green-500 text-white font-semibold text-sm py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
                    <Link to="/signup">Sign Up</Link>
                  </button>
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
        {/* Sign In and Sign Up Section */}
        <div className="p-5 border-t">
          <div className="flex flex-col space-y-3">
            <button className="w-full text-green-500 font-semibold text-sm py-3 px-4 rounded-md border border-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300">
                 <Link to="/signin">Sign In</Link>
               </button>
            <button className="w-full bg-green-500 text-white font-semibold text-sm py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
