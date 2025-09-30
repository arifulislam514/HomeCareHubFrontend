import React from "react";
import HomeBg from "../../assets/images/Home/home_bg.jpg";

// --- SVG Icon Components ---

const CheckmarkIcon = () => (
  <svg
    className="w-4 h-4 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const PlayIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    className="w-5 h-5 ml-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

// Icons for the feature cards
const WindowCleaningIcon = () => (
  <svg
    className="w-8 h-8 mb-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 8h16M4 16h16M8 4l4 4 4-4M8 20l4-4 4 4"
    />
  </svg>
);

const GreenCleaningIcon = () => (
  <svg
    className="w-8 h-8 mb-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ReliableServiceIcon = () => (
  <svg
    className="w-8 h-8 mb-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const SaferInHousesIcon = () => (
  <svg
    className="w-8 h-8 mb-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.318 1.448A12.02 12.02 0 0012 21.95a12.02 12.02 0 003.682-.533l5.318-1.448A12.02 12.02 0 0021 8.944a11.955 11.955 0 01-4.382-3.016z"
    />
  </svg>
);

// --- Reusable Feature Card Component ---
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white p-8 rounded-lg text-center flex flex-col items-center">
    {icon}
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="text-sm text-green-100">{description}</p>
  </div>
);

export default function HeroSection() {
  const featureCards = [
    {
      icon: <WindowCleaningIcon />,
      title: "Window-Cleaning",
      description:
        "Back And Relax Heall Your Freshly Cleaned Carpets Upholst Erolrs Relaxing Scent.",
    },
    {
      icon: <GreenCleaningIcon />,
      title: "Green Cleaning All",
      description:
        "Back And Relax Heall Your Freshly Cleaned Carpets Upholst Erolrs Relaxing Scent.",
    },
    {
      icon: <ReliableServiceIcon />,
      title: "Reliable Service",
      description:
        "Back And Relax Heall Your Freshly Cleaned Carpets Upholst Erolrs Relaxing Scent.",
    },
    {
      icon: <SaferInHousesIcon />,
      title: "Safer In Houses",
      description:
        "Back And Relax Heall Your Freshly Cleaned Carpets Upholst Erolrs Relaxing Scent.",
    },
  ];

  return (
    <div className="font-sans">
      {/* Top HeroSection Section */}
      <div
        className="bg-cover bg-center text-white relative"
        style={{
          backgroundImage:
            "url(" + HomeBg + ")",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Dotted overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, #FFF 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-48">
          <div className="max-w-2xl">
            <div className="flex items-center text-sm font-semibold text-green-400 mb-4">
              <CheckmarkIcon />
              100% SATISFACTION
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              House <span className="text-green-400">Cleaning</span> Solutions
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Always Been So Professional In Handling Our Teams.
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300">
                GET PRICING
                <ArrowRightIcon />
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center transition duration-300">
                <PlayIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Cards Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, index) => (
              <FeatureCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
