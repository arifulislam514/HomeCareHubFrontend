import React from 'react';
import img1 from "../../assets/images/Home/AboutSection_1.jpg";
import img2 from "../../assets/images/Home/AboutSection_2.jpg";
import img3 from "../../assets/images/Home/AboutSection_3.jpg";
import { PaintbrushVertical } from 'lucide-react';
import { Link } from "react-router-dom";


// --- SVG Icon Components ---

const CheckmarkIcon = () => (
    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
);

const HelplineIcon = () => (
    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2 2m-2-2v4m0 0l-2 2m2-2l-2-2m-2 4h.01M12 2a10 10 0 11-10 10 10 10 0 0110-10z" /></svg>
);

const ArrowRightIcon = () => (
     <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
);


export default function AboutSection() {

    const whyChooseUsItems = [
        "100% Satisfaction Guarantee",
        "Schedule A Cleaning Time",
        "Trained Professionals",
        "Choose Synergy The Maids"
    ];

    return (
        <div className="bg-white font-sans py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left side - Image Collage */}
                    <div className="relative h-[400px] sm:h-[550px] w-full">
                        <div className="absolute inset-0 p-4 border-8 border-green-500 rounded-2xl">
                             {/* Main image */}
                             <img 
                                src={img1} 
                                alt="Professional cleaner at work"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                       
                        {/* Smaller image 1 */}
                        <div className="absolute bottom-4 left-[-2rem] w-40 h-48 sm:w-56 sm:h-64 bg-white p-2 rounded-xl shadow-2xl">
                             <img 
                                src={img2}
                                alt="Cleaning equipment"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                         {/* Center Brush Icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-green-500 rounded-full p-5 border-4 border-white shadow-lg">
                                <PaintbrushVertical />
                            </div>
                        </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="relative">
                        {/* Dotted Background */}
                        <div 
                            className="absolute top-[-2rem] right-0 w-32 h-32 opacity-30"
                            style={{backgroundImage: 'radial-gradient(circle, #083d41 1px, transparent 1px)', backgroundSize: '10px 10px'}}
                        ></div>

                        <div className="relative">
                            <p className="font-semibold text-green-600 mb-2 tracking-wide uppercase relative inline-block">
                                <span className="absolute top-1/2 left-[-2.5rem] w-8 h-0.5 bg-green-600"></span>
                                ABOUT CLEANING
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#083d41] leading-tight">
                                Our Cleaning Agency <br /> For Your City
                            </h2>
                            <p className="mt-4 text-gray-600">
                                When You Work Angeles House Cleaners Referal Agency Cleaning Breathe Easy Because Your Home Will Soon
                            </p>

                            <div className="mt-6 flex flex-col sm:flex-row gap-6">
                                <div>
                                    <h3 className="font-bold text-lg text-[#083d41] mb-3">Why Choose Us</h3>
                                    <ul className="space-y-2">
                                        {whyChooseUsItems.map(item => (
                                            <li key={item} className="flex items-center text-gray-700">
                                                <CheckmarkIcon /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-shrink-0">
                                    <img 
                                        src={img3}
                                        alt="Pool cleaning service"
                                        className="w-full sm:w-48 h-auto object-cover rounded-xl shadow-md"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-6 sm:space-y-0">
                                <div className="flex items-center space-x-4">
                                     <div className="p-2 border-2 border-dashed border-green-500 rounded-full">
                                        <HelplineIcon />
                                     </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Call Helpline</p>
                                        <p className="font-bold text-lg text-[#083d41]">+88(0) 1237 6421</p>
                                    </div>
                                </div>
                                <Link 
                                    to="/service"
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center transition duration-300 group w-full sm:w-auto">
                                    Book Service
                                    <ArrowRightIcon />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
