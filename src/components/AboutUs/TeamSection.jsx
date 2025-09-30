import React from 'react';

// --- SVG Icon Components for Social Links ---
const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const TwitterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.117 0-3.486.011-4.71.066-2.734.125-3.957 1.348-4.082 4.082-.055 1.224-.066 1.595-.066 4.71s.011 3.486.066 4.71c.125 2.734 1.348 3.957 4.082 4.082 1.224.055 1.595.066 4.71.066s3.486-.011 4.71-.066c2.734-.125 3.957-1.348 4.082-4.082.055-1.224.066-1.595.066-4.71s-.011-3.486-.066-4.71c-.125-2.734-1.348-3.957-4.082-4.082-1.224-.055-1.595-.066-4.71-.066zM12 6.883c-2.826 0-5.117 2.291-5.117 5.117s2.291 5.117 5.117 5.117 5.117-2.291 5.117-5.117S14.826 6.883 12 6.883zm0 8.771c-1.921 0-3.481-1.56-3.481-3.481s1.56-3.481 3.481-3.481 3.481 1.56 3.481 3.481-1.56 3.481-3.481 3.481zM18.405 4.882c-.958 0-1.737.779-1.737 1.737s.779 1.737 1.737 1.737 1.737-.779 1.737-1.737-.779-1.737-1.737-1.737z" />
    </svg>
);


// --- Reusable Team Member Card Component ---
const TeamMemberCard = ({ name, role, image }) => (
    <div className="text-center group">
        <div className="relative inline-block overflow-hidden rounded-2xl">
            <img src={image} alt={name} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col space-y-3">
                    <a href="#" className="text-white hover:text-green-400"><FacebookIcon /></a>
                    <a href="#" className="text-white hover:text-green-400"><TwitterIcon /></a>
                    <a href="#" className="text-white hover:text-green-400"><InstagramIcon /></a>
                </div>
            </div>
        </div>
        <h3 className="mt-4 font-bold text-xl text-[#083d41]">{name}</h3>
        <p className="text-green-600 font-semibold">{role}</p>
    </div>
);


export default function TeamSection() {
    
    const teamMembers = [
        { name: "ALEXANDRA DARIO", role: "founder, CEO", image: "https://placehold.co/400x500/EBF4FA/333333?text=Alexandra" },
        { name: "EMELY JONSON", role: "office cleaner", image: "https://placehold.co/400x500/A0DEFF/333333?text=Emely" },
        { name: "TONOY RAHOMON", role: "Supervisor", image: "https://placehold.co/400x500/CAF4FF/333333?text=Tonoy" },
        { name: "RIVAN ISLAM", role: "Supervisor", image: "https://placehold.co/400x500/5AB2FF/333333?text=Rivan" },
    ];

    return (
        <section className="font-sans bg-white py-16 sm:py-24 relative overflow-hidden">
             {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/4 h-1/4 opacity-30"
                style={{backgroundImage: 'radial-gradient(circle, #a0aec0 1px, transparent 1px)', backgroundSize: '15px 15px'}}>
            </div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 opacity-10 transform -translate-x-1/2"
                style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M50 0 L100 50 L50 100 L0 50 Z\' fill=\'%23a0aec0\'/%3E%3C/svg%3E")', backgroundSize: '200px'}}>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="font-semibold text-green-600 tracking-wide uppercase relative inline-block">
                        <span className="absolute top-1/2 left-[-3rem] w-8 h-0.5 bg-green-500"></span>
                        MEET OUR TEAM
                        <span className="absolute top-1/2 right-[-3rem] w-8 h-0.5 bg-green-500"></span>
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#083d41] leading-tight mt-4">
                        We have a expert team
                    </h2>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard 
                            key={index}
                            name={member.name}
                            role={member.role}
                            image={member.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
