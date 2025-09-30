import React from 'react';

// --- SVG Icon Components ---
const PhoneIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);

const MailIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

const TwitterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.94 0-1.62.68-1.62 1.93V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.38.99 3.38 3.3z" />
    </svg>
);

const InstagramIcon = () => (
     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.117 0-3.486.011-4.71.066-2.734.125-3.957 1.348-4.082 4.082-.055 1.224-.066 1.595-.066 4.71s.011 3.486.066 4.71c.125 2.734 1.348 3.957 4.082 4.082 1.224.055 1.595.066 4.71.066s3.486-.011 4.71-.066c2.734-.125 3.957-1.348 4.082-4.082.055-1.224.066-1.595.066-4.71s-.011-3.486-.066-4.71c-.125-2.734-1.348-3.957-4.082-4.082-1.224-.055-1.595-.066-4.71-.066zM12 6.883c-2.826 0-5.117 2.291-5.117 5.117s2.291 5.117 5.117 5.117 5.117-2.291 5.117-5.117S14.826 6.883 12 6.883zm0 8.771c-1.921 0-3.481-1.56-3.481-3.481s1.56-3.481 3.481-3.481 3.481 1.56 3.481 3.481-1.56 3.481-3.481 3.481zM18.405 4.882c-.958 0-1.737.779-1.737 1.737s.779 1.737 1.737 1.737 1.737-.779 1.737-1.737-.779-1.737-1.737-1.737z" />
    </svg>
);

const VimeoIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.5,6.2c-0.3,1.6-1.4,3.1-3.1,4.5c-1.8,1.4-3.8,2.1-6,2.1c-1.1,0-2.2-0.2-3.2-0.5c-1.1-0.4-2-1-2.7-1.8 c-0.5-0.6-0.8-1.2-0.8-1.9c0-0.6,0.3-1.2,0.8-1.7c0.6-0.5,1.3-0.8,2.1-0.8c1.1,0,2.1,0.4,2.9,1.1c0.8,0.7,1.2,1.7,1.2,2.8 c0,0.5-0.1,1-0.2,1.5c-0.2,0.5-0.5,0.9-0.8,1.2c-0.4,0.3-0.8,0.5-1.2,0.5c-0.5,0-1-0.2-1.4-0.5c-0.3-0.2-0.5-0.6-0.5-1 c0-0.5,0.2-1,0.6-1.4c0.4-0.4,1-0.6,1.7-0.6c0.7,0,1.3,0.2,1.9,0.5c0.6,0.3,1,0.5,1.2,0.6c0.7,0.4,1.3,0.6,1.8,0.6 c0.7,0,1.3-0.2,1.8-0.5c0.5-0.4,0.9-0.8,1.1-1.4c0.2-0.6,0.3-1.2,0.3-1.9c0-1.2-0.4-2.3-1.2-3.3c-0.8-1-1.9-1.5-3.3-1.5 c-0.8,0-1.6,0.2-2.3,0.5c-0.7,0.3-1.4,0.8-2,1.4c-0.6,0.6-1,1.3-1.2,2.1L12.9,9C12.4,7.5,11.5,6.4,10.2,5.5 C8.9,4.7,7.5,4.3,6,4.3C4.8,4.3,3.7,4.6,2.7,5.3C1.7,6,1,6.8,0.6,7.8C0.2,8.8,0,9.9,0,11c0,1.7,0.5,3.2,1.6,4.5 C2.7,16.8,4,17.7,5.6,18.1c1.6,0.4,3.2,0.4,4.7-0.1c1.6-0.5,2.9-1.3,4-2.5c1.1-1.2,1.9-2.6,2.4-4.2c0.5-1.6,0.8-3.3,0.8-5 c0-0.5-0.1-1-0.2-1.5C23.2,4.1,23.6,5.1,23.5,6.2z"/>
    </svg>
);


// --- Reusable Contact Info Component ---
const ContactInfo = ({ icon, title, lines }) => (
    <div className="flex items-center">
        <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            {icon}
        </div>
        <div className="ml-4">
            <h3 className="font-bold text-lg text-[#083d41]">{title}</h3>
            {lines.map((line, index) => (
                <p key={index} className="text-gray-600">{line}</p>
            ))}
        </div>
    </div>
);


export default function ContactSection() {

  return (
    <section className="font-sans bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Contact Info */}
          <div>
            <p className="font-semibold text-green-600 mb-2 tracking-wide uppercase relative inline-block">
                <span className="absolute top-1/2 left-[-2.5rem] w-8 h-0.5 bg-green-600"></span>
                CONTACT US
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#083d41] leading-tight mb-8">
                Get In Touch With Us
            </h2>
            
            <div className="space-y-8">
                <div>
                    <h3 className="font-bold text-lg text-[#083d41]">ADDRESS:</h3>
                    <p className="text-gray-600 mt-1">Rodo WQ 966 Munich Express<br/>70Germany, Park Lan, TX 7859</p>
                </div>
                
                <ContactInfo 
                    icon={<PhoneIcon />}
                    title="CUSTOMER SERVICE:"
                    lines={["+9-555-888-679", "+9-666-888-679"]}
                />
                
                <ContactInfo 
                    icon={<MailIcon />}
                    title="CAREERS:"
                    lines={["exemple@info.com"]}
                />
            </div>

            <div className="mt-10 pt-8 border-t border-dashed border-gray-300">
                <h3 className="font-bold text-lg text-[#083d41] mb-4">FOLLOW US:</h3>
                <div className="flex items-center space-x-5 text-gray-600">
                    <a href="#" className="hover:text-green-500"><TwitterIcon/></a>
                    <a href="#" className="hover:text-green-500"><LinkedInIcon/></a>
                    <a href="#" className="hover:text-green-500"><InstagramIcon/></a>
                    <a href="#" className="hover:text-green-500"><VimeoIcon/></a>
                </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div>
            <form action="#" method="POST" className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input type="text" name="first-name" placeholder="Fast Name *" required className="w-full px-5 py-4 rounded-lg bg-gray-100 border-transparent focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition" />
                    <input type="text" name="last-name" placeholder="Last Name *" required className="w-full px-5 py-4 rounded-lg bg-gray-100 border-transparent focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input type="tel" name="phone" placeholder="Your Phone *" required className="w-full px-5 py-4 rounded-lg bg-gray-100 border-transparent focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition" />
                    <input type="email" name="email" placeholder="Your Email *" required className="w-full px-5 py-4 rounded-lg bg-gray-100 border-transparent focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition" />
                </div>
                <div>
                    <textarea name="message" rows="6" placeholder="your message ..." className="w-full px-5 py-4 rounded-lg bg-gray-100 border-transparent focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full transition duration-300 text-lg">
                        Send Message
                    </button>
                </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
