import React, { useRef, useState, useEffect } from 'react';
import { BrushCleaning, Brush, SprayCan } from 'lucide-react';
import apiClient from '../../services/api-client';

// --- SVG Icon Components ---

const ArrowLeftIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
);

const ArrowRightIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

const HomeIcon = () => (
    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);

const KitchenIcon = () => (
    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const PurifyIcon = () => (
    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);

const BedIcon = () => (
    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
);

const iconMap = {
  "Room Cleaning": <BrushCleaning />,
  "Kitchen Cleaning": <Brush />,
  "Office Cleaning": <SprayCan />,
  default: <BrushCleaning />,
};

const getServiceIcon = (serviceName) => {
  return iconMap[serviceName] || iconMap["default"];
};

// --- Reusable Service Card Component ---
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


export default function ExcellentService() {
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
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-center px-3"
                >
                  <ServiceCard
                    image={service.image}
                    icon={getServiceIcon(service.name)}
                    title={service.name}
                    description={service.desc}
                    price={service.price}
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
