import React, { useState } from 'react';

// --- SVG Icon Components ---
const StarIcon = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-green-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
);

const ArrowLeftIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
);

const ArrowRightIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
);

const QuoteIcon = () => (
    <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.5 2a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h2a.5.5 0 00.5-.5V7.5a.5.5 0 00-.5-.5h-1.5a.5.5 0 01-.5-.5v-4a.5.5 0 00-.5-.5h-2zM11.5 2a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h2a.5.5 0 00.5-.5V7.5a.5.5 0 00-.5-.5h-1.5a.5.5 0 01-.5-.5v-4a.5.5 0 00-.5-.5h-2z" clipRule="evenodd" /></svg>
);


export default function BookingSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: "Alaxander Pall",
            rating: 5,
            quote: "When You Work With Los Angeles House Cleaners Refal Agen Cleaning Room Breathe Easy Because Your Home Will Soon When Yowork With Angeles House Cleaners Referal Agency Cleaning Breathe",
            image: "https://placehold.co/100x100/EBF4FA/333333?text=Client+1"
        },
        {
            name: "Maria Garcia",
            rating: 5,
            quote: "Absolutely phenomenal service. The team was punctual, professional, and left my apartment looking better than it ever has. The booking process was incredibly simple and straightforward.",
            image: "https://placehold.co/100x100/A0DEFF/333333?text=Client+2"
        },
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="bg-[#083d41] font-sans relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 opacity-10"
                style={{backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '15px 15px'}}
            ></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left - Booking Form */}
                    <div className="relative h-[600px] flex items-center justify-center">
                        <img 
                            src="https://placehold.co/800x1000/cccccc/333333?text=Cleaner" 
                            alt="Professional cleaner" 
                            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-25 rounded-2xl"></div>
                        
                        <div className="relative bg-green-600 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md">
                            <p className="font-semibold text-white mb-2 tracking-wide uppercase relative inline-block">
                                <span className="absolute top-1/2 left-[-2.5rem] w-8 h-0.5 bg-white"></span>
                                CLEANING SERVICE
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
                                Book Your Cleaning?
                            </h2>
                            <form action="#" method="POST" className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input type="text" name="name" placeholder="Your Name *" className="w-full px-4 py-3 rounded-lg bg-white border-transparent focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                                    <input type="email" name="email" placeholder="Email *" className="w-full px-4 py-3 rounded-lg bg-white border-transparent focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <input type="tel" name="phone" placeholder="Phone *" className="w-full px-4 py-3 rounded-lg bg-white border-transparent focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                                     <select name="service_type" className="w-full px-4 py-3 rounded-lg bg-white border-transparent focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                                        <option>Type of service</option>
                                        <option>Home Cleaning</option>
                                        <option>Office Cleaning</option>
                                        <option>Deep Cleaning</option>
                                    </select>
                                </div>
                                <div>
                                    <textarea name="message" rows="4" placeholder="your message" className="w-full px-4 py-3 rounded-lg bg-white border-transparent focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-[#083d41] hover:bg-opacity-90 text-white font-bold py-4 px-4 rounded-lg transition duration-300">
                                        SEE MY INSTANT QUOTE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    {/* Right - Testimonial Carousel */}
                    <div className="text-white relative">
                         <div className="absolute bottom-0 right-0 z-0 opacity-20 transform translate-x-4 translate-y-4">
                            <QuoteIcon />
                        </div>
                        <div className="relative z-10">
                            <p className="font-semibold text-green-400 mb-2 tracking-wide uppercase relative inline-block">
                                <span className="absolute top-1/2 left-[-2.5rem] w-8 h-0.5 bg-green-400"></span>
                                TESTIMONIAL
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
                                Our Client Are Saying
                            </h2>
                            <p className="opacity-80 mb-8">
                                Breathe Easy Because Your Home Will Soon
                            </p>

                            <div key={currentIndex} className="transition-opacity duration-500 ease-in-out animate-fadeIn p-6 rounded-lg bg-white bg-opacity-5 border border-gray-700">
                                <div className="flex items-center mb-4">
                                    <img src={currentTestimonial.image} alt={currentTestimonial.name} className="w-16 h-16 rounded-full mr-4 border-2 border-green-400 p-1"/>
                                    <div>
                                        <p className="font-bold text-xl">{currentTestimonial.name}</p>
                                        <div className="flex mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon key={i} filled={i < currentTestimonial.rating} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-300 italic">
                                    "{currentTestimonial.quote}"
                                </p>
                            </div>

                            {/* Carousel Navigation */}
                            <div className="flex space-x-4 mt-8 border-t border-gray-700 pt-6">
                                <button onClick={handlePrev} className="w-12 h-12 rounded-full border-2 border-gray-600 text-gray-400 hover:bg-green-500 hover:border-green-500 hover:text-white transition flex items-center justify-center">
                                    <ArrowLeftIcon />
                                </button>
                                <button onClick={handleNext} className="w-12 h-12 rounded-full border-2 border-gray-600 text-gray-400 hover:bg-green-500 hover:border-green-500 hover:text-white transition flex items-center justify-center">
                                    <ArrowRightIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`.animate-fadeIn { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }`}
            </style>
        </section>
    );
}
