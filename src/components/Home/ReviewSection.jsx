import React, { useState } from 'react';

// --- SVG Icon Components ---
const PlayIcon = () => (
    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
);

const StarIcon = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-green-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
);

const ArrowLeftIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
);

const ArrowRightIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
);

const QuoteIcon = () => (
    <svg className="w-24 h-24 text-gray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.5 2a.5.5 0 00-.5.5v1.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1.5a.5.5 0 00-.5-.5h-1zM4 6a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-1zm1.5 5.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1.5zM12.5 2a.5.5 0 00-.5.5v1.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1.5a.5.5 0 00-.5-.5h-1zM11 6a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-1zm1.5 5.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1.5z" clipRule="evenodd" /></svg>
);


// --- Stat Card Component ---
const StatCard = ({ value, label, icon }) => (
    <div className="flex items-center text-white">
        <div className="p-4 border-2 border-dashed border-white rounded-full mr-4">
            {icon}
        </div>
        <div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm opacity-90">{label}</p>
        </div>
    </div>
);


export default function ReviewSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: "Alaxander Pall",
            rating: 5,
            quote: "When You Work With Los Angeles House Cleaners Refal Agen Cleaning Breathe Easy Because Your Home Will Soon When Yowork With Angeles House Cleaners Referal Agency Cleaning Breathe",
            image: "https://placehold.co/100x100/EBF4FA/333333?text=Client+1"
        },
        {
            name: "Jane Doe",
            rating: 4,
            quote: "A fantastic and reliable service every single time. The team is professional, friendly, and always leaves my home sparkling. Highly recommended for anyone needing quality cleaning.",
            image: "https://placehold.co/100x100/A0DEFF/333333?text=Client+2"
        },
        {
            name: "John Smith",
            rating: 5,
            quote: "I've tried a few cleaning services in the city, and this is by far the best. The attention to detail is incredible. It's like coming home to a brand new apartment after they're done.",
            image: "https://placehold.co/100x100/CAF4FF/333333?text=Client+3"
        }
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };
    
    const currentTestimonial = testimonials[currentIndex];

    const stats = [
        { value: "35K", label: "QUALITY SERVICES", icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.886 11L5.618 4.437A2 2 0 017.48 2h9.04a2 2 0 011.862 2.437L16.114 11H7.886z" /></svg> },
        { value: "12+", label: "YEAR EXPERIENCE", icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { value: "99%", label: "SUCCESS RATE", icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
        { value: "100", label: "AWARDS WINNING", icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> }
    ];

    return (
        <section className="font-sans bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Video Section */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                        <img src="https://placehold.co/600x650/EBF4FA/333333?text=Video+Thumbnail" alt="Office cleaning" className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <button className="flex items-center text-white text-lg font-bold group-hover:scale-110 transition-transform">
                                <span className="mr-4">watch video</span>
                                <PlayIcon />
                            </button>
                        </div>
                    </div>

                    {/* Right - Testimonial Section */}
                    <div className="relative">
                         <div className="absolute top-[-2rem] right-0 w-32 h-32 opacity-20"
                            style={{backgroundImage: 'radial-gradient(circle, #083d41 1px, transparent 1px)', backgroundSize: '10px 10px'}}
                        ></div>
                        <div className="absolute bottom-0 right-0 z-0">
                            <QuoteIcon />
                        </div>

                        <div className="relative z-10">
                            <p className="font-semibold text-green-600 mb-2 tracking-wide uppercase relative inline-block">
                                <span className="absolute top-1/2 left-[-2.5rem] w-8 h-0.5 bg-green-600"></span>
                                TESTIMONIAL
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#083d41] leading-tight mb-6">
                                Our Client Are Saying <br/>About us
                            </h2>

                            <div key={currentIndex} className="transition-opacity duration-500 ease-in-out animate-fadeIn">
                                <p className="font-bold text-xl text-[#083d41]">{currentTestimonial.name}</p>
                                <div className="flex my-2">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} filled={i < currentTestimonial.rating} />
                                    ))}
                                </div>
                                <p className="text-gray-600 italic mt-4 text-lg">
                                    " {currentTestimonial.quote} "
                                </p>
                                <div className="flex items-center mt-6">
                                    <img src={currentTestimonial.image} alt={currentTestimonial.name} className="w-16 h-16 rounded-full mr-4 border-2 border-green-500 p-1"/>
                                    <div>
                                        <p className="font-bold text-lg text-[#083d41]">{currentTestimonial.name}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Carousel Navigation */}
                            <div className="flex space-x-3 mt-8">
                                <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-[#083d41] text-white hover:bg-green-500 transition flex items-center justify-center">
                                    <ArrowLeftIcon />
                                </button>
                                <button onClick={handleNext} className="w-10 h-10 rounded-full bg-[#083d41] text-white hover:bg-green-500 transition flex items-center justify-center">
                                    <ArrowRightIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Stats Bar */}
            <div className="bg-green-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <StatCard key={index} value={stat.value} label={stat.label} icon={stat.icon} />
                        ))}
                    </div>
                </div>
            </div>
            <style>
                {`.animate-fadeIn { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }`}
            </style>
        </section>
    );
}
