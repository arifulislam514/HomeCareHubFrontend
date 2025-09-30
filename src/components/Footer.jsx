import React from 'react';
import logoUrl from "../assets/images/Logo.png";

// --- Icon Components ---

const PhoneIcon = () => (
  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33V21.878C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.148-3.225 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163zm0 1.802c-3.116 0-3.483.01-4.702.066-2.583.117-3.968 1.502-4.085 4.085-.056 1.218-.066 1.585-.066 4.702s.01 3.483.066 4.702c.117 2.583 1.502 3.968 4.085 4.085 1.218.056 1.585.066 4.702.066s3.483-.01 4.702-.066c2.583-.117 3.968-1.502 4.085-4.085.056-1.218.066-1.585.066-4.702s-.01-3.483-.066-4.702c-.117-2.583-1.502-3.968-4.085-4.085C15.483 3.975 15.116 3.965 12 3.965zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.802a1.948 1.948 0 110 3.896 1.948 1.948 0 010-3.896zM16.865 6.78a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
    </svg>
);

const LinkedinIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);


export default function Footer() {

    const usefulLinks1 = [
        { text: "Help Center", path: "#" },
        { text: "About Us", path: "#" },
        { text: "Contact Us", path: "#" },
        { text: "Become A Cleaner", path: "#" },
        { text: "Blog", path: "#" },
    ];
    
    const usefulLinks2 = [
        { text: "Apartment Cleaning", path: "#" },
        { text: "One-Time Clean", path: "#" },
        { text: "Shield Glass", path: "#" },
        { text: "Vacation Rental Cleaning", path: "#" },
    ];

    const instagramImages = [
        "https://placehold.co/100x100/A0DEFF/FFFFFF?text=Insta",
        "https://placehold.co/100x100/5AB2FF/FFFFFF?text=Insta",
        "https://placehold.co/100x100/CAF4FF/333333?text=Insta",
        "https://placehold.co/100x100/A0DEFF/FFFFFF?text=Insta",
        "https://placehold.co/100x100/5AB2FF/FFFFFF?text=Insta",
        "https://placehold.co/100x100/CAF4FF/333333?text=Insta",
    ];

  return (
    <footer className="bg-[#083d41] text-gray-300 font-sans">
        <div className="max-w-7xl mx-auto pt-16 pb-8 px-10 sm:px-12 lg:px-1">
            <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-8">

                {/* About Section */}
                <div className="space-y-6 lg:col-span-4 md:col-span-5 lg:pr-10">
                    <div className='flex items-center'>
                        <img src={logoUrl} alt="HCH Logo" className="w-30" />
                        <h1 className='text-2xl font-extrabold text-white'>Home Care Hub</h1>
                    </div>
                    <p className="text-sm text-left">
                        Provide Detailed House Cleaning Sanitizing Services For Valued Clients.
                    </p>
                    <div className="flex items-center space-x-4">
                        <PhoneIcon />
                        <div className='text-left ml-3'>
                            <p className="text-lg font-bold text-white">+1 999 888 666</p>
                            <p className="text-xs text-gray-400">Call 24/7</p>
                        </div>
                    </div>
                    <div className='flex space-x-3 items-center'>
                        <p className="font-semibold mb-2">Follow On :</p>
                        <div className="flex space-x-3">
                            <a href="#" className="text-emerald-500 hover:text-emerald-300 transition"><FacebookIcon /></a>
                            <a href="#" className="text-emerald-500 hover:text-emerald-300 transition"><LinkedinIcon /></a>
                            <a href="#" className="text-emerald-500 hover:text-emerald-300 transition"><InstagramIcon /></a>
                        </div>
                    </div>
                </div>

                {/* Useful Links Section */}
                <div className="lg:col-span-5 md:col-span-7">
                    <h3 className="text-xl font-bold text-white mb-4 relative pb-2">
                        Useful Links
                        <span className="absolute bottom-0 left-0 lg:left-15  w-12 h-0.5 bg-green-500"></span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-1">
                        <ul className="space-y-3 lg:ml-15">
                            {usefulLinks1.map(link => (
                                <li key={link.text}>
                                    <a href={link.path} className="flex items-start hover:text-green-400 transition-colors">
                                        <span className="text-green-400 mr-2">&raquo;</span> {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <ul className="space-y-3 mt-3 sm:mt-0">
                             {usefulLinks2.map(link => (
                                <li key={link.text}>
                                    <a href={link.path} className="flex items-start text-left hover:text-green-400 transition-colors">
                                        <span className="text-green-400 mr-2">&raquo;</span> {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Instagram Section */}
                <div className='lg:col-span-3 md:col-span-6'>
                    <h3 className="text-xl font-bold text-white mb-4 relative pb-2">
                        Instagram
                        <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-green-500"></span>
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        {instagramImages.map((src, index) => (
                            <a href="#" key={index}>
                                <img src={src} alt={`Instagram post ${index + 1}`} className="rounded-md hover:opacity-80 transition-opacity" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-green-500 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-sm">
                <p className="text-center sm:text-left mb-2 sm:mb-0">
                    © Copyright 2025 – HCH. All rights reserved. <span className="text-gray-200">Vecuro</span>
                </p>
                <div className="flex items-center space-x-4">
                    {/* Placeholder for payment icons */}
                    <div className="flex space-x-2">
                        <div className="w-15 h-6 bg-white rounded-sm flex items-center justify-center text-blue-800 font-bold text-xs">VISA</div>
                        <div className="w-15 h-6 bg-white rounded-sm flex items-center justify-center text-red-600 font-bold text-xs">MC</div>
                        <div className="w-15 h-6 bg-white rounded-sm flex items-center justify-center text-blue-600 font-bold text-xs">AMEX</div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
}
