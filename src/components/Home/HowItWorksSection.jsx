import React from 'react';

// A reusable component for each step in the process
const Step = ({ number, title, description, color }) => (
    <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-lg ${color}`}>
            {number}
        </div>
        <div>
            <h3 className="font-semibold text-lg text-[#083d41]">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);


export default function HowItWorksSection() {

    const steps = [
        {
            number: 1,
            title: "Choose Your Service",
            description: "Browse our services and choose the one that fits your needs.",
            color: "bg-green-500"
        },
        {
            number: 2,
            title: "Schedule a Date",
            description: "Pick a convenient date and time for our professionals to visit.",
            color: "bg-teal-500"
        },
        {
            number: 3,
            title: "Relax and Enjoy",
            description: "Our team will handle the rest, leaving your space sparkling clean.",
            color: "bg-emerald-500"
        }
    ];

    return (
        <section className="bg-white font-sans py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-green-50 rounded-3xl p-6 sm:p-10 lg:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        
                        {/* Left Side: Text Content */}
                        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold text-[#083d41] mb-8">
                                How it works
                            </h2>
                            <div className="space-y-8">
                                {steps.map((step) => (
                                    <Step 
                                        key={step.number}
                                        number={step.number}
                                        title={step.title}
                                        description={step.description}
                                        color={step.color}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Image */}
                        <div className="w-full h-80 sm:h-96 lg:h-full">
                            <img 
                                src="https://placehold.co/600x500/EBF4FA/333333?text=Happy+Client" 
                                alt="A person booking a cleaning service on their phone in a clean kitchen"
                                className="w-full h-full object-cover rounded-2xl shadow-md"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
