// NEW: Import useState and useEffect
import React, { useRef, useState, useEffect } from "react";
// NEW: Import your configured Axios instance
import apiClient from "../../services/api-client"; // Adjust this path if needed

// --- (Your SVG Icon components remain the same) ---
const ArrowLeftIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);
const ArrowRightIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);
const MopIcon = () => (
  <svg
    className="w-8 h-8 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.5 2.5a2.5 2.5 0 012.5 2.5v1.086a2.5 2.5 0 01-1.05 2.04l-2.43 1.823a1.5 1.5 0 00-.738 1.25V18.5a2.5 2.5 0 01-5 0v-7.799a1.5 1.5 0 00-.738-1.25L5.05 7.626A2.5 2.5 0 014 5.586V4a2.5 2.5 0 012.5-2.5h9z"
    />
  </svg>
);
const BroomIcon = () => (
  <svg
    className="w-8 h-8 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 10l-2 11H5l-2-11h18zM12 3v7"
    />
  </svg>
);
const SprayIcon = () => (
  <svg
    className="w-8 h-8 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

// NEW: Helper to select an icon. Your backend cannot send a React component.
// We map a string (like a category name) to the icon component.
const iconMap = {
  "Room Cleaning": <MopIcon />,
  "Kitchen Cleaning": <BroomIcon />,
  "Office Cleaning": <SprayIcon />,
  default: <MopIcon />,
};

const getServiceIcon = (serviceName) => {
  return iconMap[serviceName] || iconMap["default"];
};

const ServiceCard = ({ image, icon, title, description }) => (
  // ... (ServiceCard component remains the same)
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 group">
    {" "}
    <div className="relative">
      {" "}
      <img src={image} alt={title} className="w-full h-56 object-cover" />{" "}
      <div
        className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-32 h-32 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #083d41 2px, transparent 2px)",
          backgroundSize: "12px 12px",
        }}
      ></div>{" "}
      <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 bg-green-500 group-hover:bg-green-600 w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-xl transition-colors duration-300">
        {" "}
        {icon}{" "}
      </div>{" "}
    </div>{" "}
    <div className="p-6 pt-16 text-center">
      {" "}
      <h3 className="font-bold text-xl text-[#083d41] group-hover:text-green-600 mb-2 transition-colors duration-300">
        {title}
      </h3>{" "}
      <p className="text-gray-600 text-sm">{description}</p>{" "}
    </div>{" "}
  </div>
);

export default function ServicesSection() {
  const carouselRef = useRef(null);

  // NEW: State for services, loading, and errors
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW: useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Use your apiClient to get products. Adjust the endpoint if needed.
        const response = await apiClient.get("/products/");
        // Your data might be in response.data or response.data.results
        setServices(response.data.results || response.data);
      } catch (err) {
        setError("Failed to fetch services. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []); // Empty array means this runs only once on mount

  const scroll = (direction) => {
    // ... (scroll function remains the same)
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector("div");
      if (card) {
        const cardWidth = card.offsetWidth;
        const scrollAmount = cardWidth + 24;
        carouselRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // NEW: Handle loading state
  if (loading) {
    return (
      <div className="bg-[#083d41] py-24 text-center text-white">
        <h2 className="text-3xl font-bold">Loading Our Services...</h2>
      </div>
    );
  }

  // NEW: Handle error state
  if (error) {
    return (
      <div className="bg-[#083d41] py-24 text-center text-red-400">
        <h2 className="text-3xl font-bold">Something Went Wrong</h2>
        <p className="mt-4">{error}</p>
      </div>
    );
  }

  return (
    <>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <div className="bg-[#083d41] font-sans py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div>
              <p className="font-semibold text-green-500 mb-2 tracking-wide uppercase relative inline-block">
                <span className="absolute top-1/2 left-[-2.5rem] w-8 h-0.5 bg-green-500"></span>
                CLEANING SERVICE
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Our Excellent Service
              </h2>
            </div>
          </div>

          {/* Service Cards Carousel Container */}
          <div className="relative">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-3 py-4"
            >
              {/* CHANGED: Map over the 'services' state from the API */}
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-center px-3"
                >
                  <ServiceCard
                    // CHANGED: Match props to your backend's field names
                    image={service.image}
                    icon={getServiceIcon(service.name)} // Use the helper to get the icon
                    title={service.name}
                    description={service.desc} // Assuming your field is named 'desc'
                  />
                </div>
              ))}
            </div>
            {/* Navigation Buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute top-1/2 left-[-20px] -translate-y-1/2 w-12 h-12 rounded-full bg-white text-gray-700 hover:bg-green-500 hover:text-white shadow-lg transition flex items-center justify-center z-10"
              aria-label="Previous Service"
            >
              {" "}
              <ArrowLeftIcon />{" "}
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute top-1/2 right-[-20px] -translate-y-1/2 w-12 h-12 rounded-full bg-white text-gray-700 hover:bg-green-500 hover:text-white shadow-lg transition flex items-center justify-center z-10"
              aria-label="Next Service"
            >
              {" "}
              <ArrowRightIcon />{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
