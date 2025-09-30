import React from "react";

export default function PageBanner({ title, breadcrumb }) {
  return (
    <section className="relative bg-[#083d41] font-sans text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Main background image with overlay */}
        <img
          src="https://placehold.co/1920x500/cccccc/333333?text=Team"
          alt="Cleaning service team"
          className="w-full h-full object-cover opacity-20"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#083d41] via-[#083d41] to-transparent"></div>
      </div>

      {/* Decorative top V-shape */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-12 sm:w-32 sm:h-16 bg-green-500"
        style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
      ></div>

      {/* Dotted pattern */}
      <div
        className="absolute top-1/2 left-1/4 w-32 h-32 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
          backgroundSize: "15px 15px",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[40vh] min-h-[300px]">
          {/* Left Side: Title and Breadcrumb */}
          <div className="max-w-xl flex flex-col items-start">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-shadow">
              {title || "OUR SERVICE"}
            </h1>
            <p className="mt-4 text-lg opacity-80 tracking-wider hover:text-green-500">
              {breadcrumb || "HOME // OUR SERVICE"}
            </p>
          </div>

          {/* Right Side: Character Image */}
          <div className="hidden lg:block self-end h-[90%]">
            <img
              src="https://placehold.co/500x500/transparent/FFFFFF?text=Team"
              alt="Professional cleaners"
              className="h-full w-auto object-contain"
              // A simple drop-shadow can help lift the image from the background
              style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.3))" }}
            />
          </div>
        </div>
      </div>
      <style>{`
        .text-shadow {
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
}
