import React, { useState } from 'react';

// --- SVG Icon Components ---
const PlusIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
);

const MinusIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M18 12H6" /></svg>
);

const BrushIcon = () => (
    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.5 2.5a2.5 2.5 0 012.5 2.5v1.086a2.5 2.5 0 01-1.05 2.04l-2.43 1.823a1.5 1.5 0 00-.738 1.25V18.5a2.5 2.5 0 01-5 0v-7.799a1.5 1.5 0 00-.738-1.25L5.05 7.626A2.5 2.5 0 014 5.586V4a2.5 2.5 0 012.5-2.5h9z" /></svg>
);


// --- Reusable Accordion Item Component ---
const AccordionItem = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onClick}
                className={`w-full text-left py-5 px-6 flex justify-between items-center transition-colors duration-300 ${isOpen ? 'bg-green-500 text-white' : 'bg-white text-[#083d41] hover:bg-gray-50'}`}
            >
                <span className="font-bold text-lg">{faq.question}</span>
                <span>{isOpen ? <MinusIcon /> : <PlusIcon />}</span>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="p-6 text-gray-600 bg-white">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};


export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const handleItemClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    const faqs = [
        {
            question: "1. Deep House Cleaning Service",
            answer: "Give Your Home A Fresh New Look And Feel That You Especially After A Long Day Of Work. Our Deep Clean Will Help Bring Your Property Back Up To Scratch"
        },
        {
            question: "2. NYC Home Cleaning Company",
            answer: "We are a top-rated cleaning company in NYC, known for our reliability and attention to detail. Our professional team is trained to handle any cleaning challenge."
        },
        {
            question: "3. 100% Secure Online Payments",
            answer: "Your security is our priority. We use industry-leading encryption to protect your payment information, ensuring a safe and secure transaction every time."
        },
        {
            question: "4. Fast, Same Day Booking Confirmation",
            answer: "Need a clean in a hurry? Our streamlined booking system provides instant confirmation, with same-day service options available for your convenience."
        }
    ];

    return (
        <section className="font-sans py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1/2 h-full opacity-5"
                style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M50 0 L100 50 L50 100 L0 50 Z\' fill=\'%23a0aec0\'/%3E%3C/svg%3E")', backgroundSize: '200px'}}>
            </div>
             <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20"
                style={{backgroundImage: 'radial-gradient(circle, #083d41 1.5px, transparent 1.5px)', backgroundSize: '15px 15px'}}>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left - Image Collage */}
                    <div className="relative h-[450px] sm:h-[550px] w-full">
                        <div className="absolute top-0 left-0 w-3/4 h-3/4">
                             <img 
                                src="https://placehold.co/600x600/cccccc/333333?text=Service+1" 
                                alt="Professional cleaning a hot tub"
                                className="w-full h-full object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3/5 h-3/5 p-2 bg-white rounded-2xl shadow-2xl">
                             <div className="w-full h-full border-4 border-green-500 rounded-xl">
                                <img 
                                    src="https://placehold.co/400x400/EBF4FA/333333?text=Service+2" 
                                    alt="Cleaner with supplies"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                             </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 border-4 border-dashed border-green-500 rounded-full">
                            <div className="bg-white p-4 rounded-full shadow-md">
                                <BrushIcon />
                            </div>
                        </div>
                    </div>

                    {/* Right - FAQ Accordion */}
                    <div className="relative">
                        <p className="font-semibold text-green-600 mb-2 tracking-wide uppercase relative inline-block">
                            <span className="absolute top-1/2 left-[-2.5rem] w-8 h-0.5 bg-green-600"></span>
                            ASKED QUESTIONS
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#083d41] leading-tight">
                            General Frequently Asked Questions
                        </h2>
                        <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                            {faqs.map((faq, index) => (
                                <AccordionItem 
                                    key={index}
                                    faq={faq}
                                    isOpen={openIndex === index}
                                    onClick={() => handleItemClick(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
