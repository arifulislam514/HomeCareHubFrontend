import React from 'react';

// --- SVG Icon Components ---
const BrushIcon = () => (
    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.5 2.5a2.5 2.5 0 012.5 2.5v1.086a2.5 2.5 0 01-1.05 2.04l-2.43 1.823a1.5 1.5 0 00-.738 1.25V18.5a2.5 2.5 0 01-5 0v-7.799a1.5 1.5 0 00-.738-1.25L5.05 7.626A2.5 2.5 0 014 5.586V4a2.5 2.5 0 012.5-2.5h9z" /></svg>
);

const VacuumIcon = () => (
    <svg className="w-10 h-10 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5.5a3.5 3.5 0 000 7h11a3.5 3.5 0 000-7zM5 12V4a2 2 0 012-2h10a2 2 0 012 2v8" /></svg>
);

const LivingRoomIcon = () => (
    <svg className="w-10 h-10 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.5 14.5v3a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-3m-5-7L12 3l2.5 4.5M2 18h20" /></svg>
);

const ArrowRightIcon = () => (
     <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
);


export default function AboutAgencySection() {

    return (
        <section className="font-sans bg-white py-12 sm:py-16 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50/50" style={{clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)'}}></div>
            <div className="absolute top-0 left-0 w-1/4 h-1/4 opacity-10"
                style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M50 0 L100 50 L50 100 L0 50 Z\' fill=\'%23a0aec0\'/%3E%3C/svg%3E")', backgroundSize: '200px'}}>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left - Image Collage */}
                    <div className="relative h-[500px] sm:h-[600px] w-full">
                        {/* Main background image */}
                        <div className="absolute top-0 left-0 w-3/4 h-3/4">
                            <img 
                                src="https://placehold.co/600x600/cccccc/333333?text=Service+1" 
                                alt="Professional cleaning a hot tub"
                                className="w-full h-full object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                        {/* Smaller overlay image */}
                        <div className="absolute bottom-0 right-0 w-3/5 h-3/5 p-2 bg-white rounded-2xl shadow-2xl">
                             <div className="w-full h-full border-4 border-green-500 rounded-xl">
                                <img 
                                    src="https://placehold.co/400x400/EBF4FA/333333?text=Service+2" 
                                    alt="Cleaner with supplies"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                             </div>
                        </div>
                        {/* Center Brush Icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 border-4 border-dashed border-green-500 rounded-full">
                            <div className="bg-white p-4 rounded-full shadow-md">
                                <BrushIcon />
                            </div>
                        </div>
                    </div>

                    {/* Right - Content Section */}
                    <div className="flex flex-col h-full justify-between">
                        {/* Main Content */}
                        <div className="py-8 flex flex-col items-start">
                            <p className="font-semibold text-green-600 mb-2 tracking-wide uppercase relative inline-block">
                                <span className="absolute top-1/2 left-[-2.5rem] w-8 h-0.5 bg-green-600"></span>
                                ABOUT CLEANING
                            </p>
                            <h1 className="text-left text-4xl sm:text-5xl font-bold text-[#083d41] leading-tight">
                                Our Cleaning Agency For Your Home
                            </h1>
                            <p className="text-left mt-4 text-gray-600 max-w-lg">
                                When You Work Angeles House Cleaners Referal Agency Cleaning Breathe Easy Because Your Home Will Soon
                            </p>
                        </div>
                        
                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                            <div className="flex items-start gap-4">
                                <VacuumIcon />
                                <div className='text-left'>
                                    <h4 className="font-bold text-lg text-[#083d41]">House Cleaning</h4>
                                    <p className="text-sm text-gray-500">Leaning Machine Your Ultrasonic Parts Cleaning Dioxide</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <LivingRoomIcon />
                                <div className='text-left'>
                                    <h4 className="font-bold text-lg text-[#083d41]">Living Room Cleaning</h4>
                                    <p className="text-sm text-gray-500">Leaning Machine Your Ultrasonic Parts Cleaning Dioxide</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Action Area */}
                        <div className="pt-8 border-t border-gray-200">
                             <div className="flex flex-wrap items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                     <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full flex items-center transition duration-300 group">
                                        Book Service
                                        <ArrowRightIcon />
                                    </button>
                                    <div className="flex items-center">
                                        <img src="https://placehold.co/100x100/A0DEFF/333333?text=Co-Founder" alt="D.markwin" className="w-14 h-14 rounded-full border-2 border-white shadow-md"/>
                                        <div className="ml-[-1rem] pl-4">
                                            <p className="font-bold text-[#083d41]">D.markwin</p>
                                            <p className="text-sm text-gray-500">Co-founder</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
