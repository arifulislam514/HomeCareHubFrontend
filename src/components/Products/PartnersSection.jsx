import React from 'react';

// --- SVG Logo Components ---
// It's best practice to use SVG components for logos to ensure they scale perfectly.

const WalmartLogo = () => (
    <svg className="h-8 w-auto text-[#083d41] opacity-70 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 172 41" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.13 22.67l-2.4-7.53h-.09l-2.4 7.53h-3.2l-4.5-14.12h3.4l2.84 9.9h.09l2.4-9.9h2.98l2.4 9.9h.09l2.83-9.9h3.4l-4.5 14.12h-3.2zM28.48 11.75c0-1.7-.8-2.78-2.4-2.78h-2.1v5.5h2.02c1.55 0 2.48-.96 2.48-2.72zm-7.6-3.2h5.18c2.6 0 4.4 1.3 4.4 4.1s-1.7 4.1-4.4 4.1h-2.1v4.4h-3.08v-12.6zm15.4 12.6h-3.1V8.55h3.1v12.6zM46.72 17.5c0 3.3 2.3 4.3 4.7 4.3s3.6-1 3.6-1l.7 2.2s-1.5 1-4.6 1c-4.4 0-7.7-2.6-7.7-7.2s3.3-7.2 7.7-7.2c4.4 0 7.7 2.6 7.7 7.2s-3.3 7.2-7.7 7.2c-1.1 0-2.08-.2-2.9-.6l.7-2.2c.8.4 1.7.6 2.5.6 1.7 0 3.1-.7 3.1-2.9h-6.8zm6.8-.9h-3.8c0-1.8.8-2.9 3-2.9 2.2 0 3 .9 3.2 2.9h-2.4zM59.13 8.55l3.8 12.6h-3.2l-.8-2.8h-4.2l-.8 2.8h-3.2l3.8-12.6h4.6zm-3.5 7.5h2.3l-1.1-4.1-1.2 4.1zM73.57 22.05c-1.3.8-3 1.2-4.5 1.2-4.4 0-7.7-2.6-7.7-7.2s3.3-7.2 7.7-7.2c1.6 0 3.2.4 4.5 1.2l-1 2.5c-.8-.5-1.9-.9-3.4-.9-2.7 0-4.6 1.7-4.6 4.4s1.9 4.4 4.6 4.4c1.5 0 2.6-.4 3.4-.9l1 2.5z"></path>
        <path d="M165.95 20.37c0 .5-.4.9-.9.9h-1.9v1.9c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-1.9h-1.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h1.9v-1.9c0-.5.4-.9.9-.9s.9.4.9.9v1.9h1.9c.5 0 .9.4.9.9zm-7.9 0c0 .5-.4.9-.9.9h-1.9v1.9c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-1.9h-1.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h1.9v-1.9c0-.5.4-.9.9-.9s.9.4.9.9v1.9h1.9c.5 0 .9.4.9.9zm-7.9 0c0 .5-.4.9-.9.9h-1.9v1.9c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-1.9h-1.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h1.9v-1.9c0-.5.4-.9.9-.9s.9.4.9.9v1.9h1.9c.5 0 .9.4.9.9zm15.9-7.9c-.5 0-.9-.4-.9-.9v-1.9h-1.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h1.9V7.8c0-.5.4-.9.9-.9s.9.4.9.9v1.9h1.9c.5 0 .9.4.9.9s-.4.9-.9.9h-1.9v1.9c0 .5-.4.9-.9.9zm-7.9 0c-.5 0-.9-.4-.9-.9v-1.9h-1.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h1.9V7.8c0-.5.4-.9.9-.9s.9.4.9.9v1.9h1.9c.5 0 .9.4.9.9s-.4.9-.9.9h-1.9v1.9c0 .5-.4.9-.9.9zm-8 0c-.5 0-.9-.4-.9-.9v-1.9h-1.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h1.9V7.8c0-.5.4-.9.9-.9s.9.4.9.9v1.9h1.9c.5 0 .9.4.9.9s-.4.9-.9.9h-1.9v1.9c0 .5-.4.9-.9.9z"></path>
    </svg>
);

const InvisionLogo = () => (
    <svg className="h-10 w-auto text-[#083d41] opacity-70 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 100 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="5" fill="#083d41"/>
        <path d="M10 8h2.5v12H10V8zm5 0h2.5v12H15V8z" fill="white"/>
        <path d="M40.2 20V8h2.6v12h-2.6zm7.4 0V8h10.8v2.3h-8.2v2.9h7.6v2.3h-7.6v2.2h8.2V20h-10.8zm14.3 0V8h2.6v12h-2.6zm7.2 0V8h2.6l4.4 7.2V8h2.5v12h-2.3l-4.6-7.5v7.5h-2.6zm14.5-6.2c0-3.5-2.5-6.2-6.1-6.2s-6.1 2.7-6.1 6.2 2.5 6.2 6.1 6.2 6.1-2.7 6.1-6.2zm-2.6 0c0 2-1.6 3.9-3.5 3.9s-3.5-1.9-3.5-3.9 1.6-3.9 3.5-3.9 3.5 1.9 3.5 3.9z" fill="#083d41"/>
    </svg>
);

const LogitechLogo = () => (
    <svg className="h-8 w-auto text-[#083d41] opacity-70 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 107 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.2 27.4V.6h2.5v26.8H8.2zM21.6 14c0-7.8 5.6-14 13.5-14s13.5 6.2 13.5 14-5.6 14-13.5 14S21.6 21.8 21.6 14zm2.5 0c0 6.2 4.8 11.4 11 11.4s11-5.2 11-11.4S41.3 2.6 35.1 2.6s-11 5.2-11 11.4zM53.1 27.4V.6h2.5v11.8h9.8V.6h2.5v26.8h-2.5V14.9h-9.8v12.5h-2.5zM78.6 27.4V.6h2.5v26.8h-2.5zm10.7 0V.6h2.5v11.8h9.8V.6h2.5v26.8h-2.5V14.9h-9.8v12.5h-2.5zM0 14c0 .8.7 1.5 1.5 1.5H5v-3H1.5C.7 12.5 0 13.2 0 14z"/>
    </svg>
);

const YahooLogo = () => (
     <svg className="h-8 w-auto text-[#083d41] opacity-70 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 91 29" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9 28.3L9.1 16.5h-.1L5.3 28.3H0l7.3-28h2.6l7.3 28h-5.2zM27.2 28.3c-4.4 0-7.3-2.9-7.3-7.5V.3h5.1v20.4c0 2.2 1.3 3.6 3.6 3.6s3.6-1.4 3.6-3.6V.3h5.1v20.4c0 4.6-2.9 7.6-7.4 7.6zM46.6 14.1c0-7.8 5.6-14.1 13.5-14.1s13.5 6.3 13.5 14.1-5.6 14.1-13.5 14.1S46.6 21.9 46.6 14.1zm5.1 0c0 5.1 3.5 9.1 8.4 9.1s8.4-4 8.4-9.1S68.6 5 63.7 5s-8.4 4-8.4 9.1zM84.4 28.3c-1.8 0-3-.9-3.5-2.2l-.2-1.1h-11.7l-.1 1c-.6 1.3-1.8 2.3-3.7 2.3-2.8 0-4.5-1.9-4.5-4.5s1.7-4.5 4.5-4.5c1.8 0 3 .9 3.6 2.1l.2 1h11.7l.1-1c.6-1.2 1.7-2.1 3.6-2.1 2.8 0 4.5 1.9 4.5 4.5s-1.7 4.6-4.5 4.6zm0-2.3c.6 0 1.1-.3 1.1-1s-.5-.9-1.1-.9-.9.4-1.1.9c0 .6.4 1 1.1 1zm-15.5 0c.6 0 1.1-.3 1.1-1s-.5-.9-1.1-.9-.9.4-1.1.9c0 .6.5 1 1.1 1zm8.2 8.2c-.2 0-.4-.1-.5-.2-.1-.1-.2-.3-.2-.5s.1-.4.2-.5.3-.2.5-.2.4.1.5.2c.1.1.2.3.2.5s-.1.4-.2.5c-.1.1-.3.2-.5.2z"/>
    </svg>
);

const MondayLogo = () => (
    <svg className="h-8 w-auto text-[#083d41] opacity-70 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 132 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.3 0 0 6.3 0 14s6.3 14 14 14 14-6.3 14-14S21.7 0 14 0zm0 25C7.9 25 3 20.1 3 14S7.9 3 14 3s11 4.9 11 11-4.9 11-11 11zM44.5 27.7V.3h-3.4l-9 14-9-14h-3.4v27.4h2.8V7.5l8.1 12.8h2.2l8.1-12.8v20.2h2.8zM68.4 14c0-7.8 5.6-14 13.5-14s13.5 6.2 13.5 14-5.6 14-13.5 14-13.5-6.2-13.5-14zm24.5 0c0-6.1-4.9-11.1-11-11.1s-11 5-11 11.1 4.9 11.1 11 11.1 11-5 11-11.1zM103.5 27.7V.3h2.8v27.4h-2.8zm11.2-13.7c0-3.9 2.5-6.5 6-6.5s6 2.6 6 6.5-2.5 6.5-6 6.5-6-2.6-6-6.5zm19.2 0c0-2.2-1.3-3.7-3.2-3.7s-3.2 1.5-3.2 3.7 1.3 3.7 3.2 3.7 3.2-1.5 3.2-3.7z"/>
    </svg>
);


export default function PartnersSection() {
    const logos = [
        <WalmartLogo />,
        <InvisionLogo />,
        <LogitechLogo />,
        <YahooLogo />,
        <MondayLogo />,
    ];

  return (
    <>
      <style>{`
        @keyframes scroll {
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="group w-full overflow-hidden" 
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <div className="flex w-max flex-nowrap items-center gap-x-12 animate-scroll">
              {/* Render logos and their duplicates for a seamless loop */}
              {[...logos, ...logos].map((LogoComponent, index) => (
                <div key={index} className="flex-shrink-0">
                  {React.cloneElement(LogoComponent, { key: `logo-${index}` })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

