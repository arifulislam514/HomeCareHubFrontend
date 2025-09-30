import React, { useState } from 'react';

// --- SVG Icon Components ---
const CameraIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const UserCircleIcon = () => (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const MailIcon = () => (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const PhoneIcon = () => (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);
const LocationIcon = () => (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);


// --- Layout and Page Components ---

// This would be your main UserDashboard layout component
const UserDashboardLayout = ({ children }) => {
    // This is a placeholder for the actual layout component.
    // In a real app, this would contain the sidebar and header.
    return (
        <div className="font-sans bg-gray-100 min-h-screen">
             <div className="lg:pl-64 flex flex-col min-h-screen">
                 {/* Placeholder for a mobile header */}
                <header className="sticky top-0 z-30 bg-white shadow-sm lg:hidden p-4">
                    <h1 className="text-xl font-bold text-[#083d41]">My Profile</h1>
                </header>
                {/* Placeholder for a desktop sidebar */}
                <aside className="hidden lg:fixed lg:inset-y-0 lg:w-64 lg:flex lg:flex-col bg-[#083d41] p-4">
                    <h1 className="text-3xl font-bold text-white text-center">Home care Hub</h1>
                    <nav className="mt-8">
                        {/* Nav links would go here */}
                    </nav>
                </aside>
                <main className="flex-grow p-6 sm:p-8">{children}</main>
            </div>
        </div>
    );
};


const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('personal');

    const renderContent = () => {
        switch (activeTab) {
            case 'personal':
                return (
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                             <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <UserCircleIcon className="absolute left-3 top-9 w-5 h-5 text-gray-400"/>
                                <input type="text" defaultValue="Alaxander Pall" className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <MailIcon className="absolute left-3 top-9 w-5 h-5 text-gray-400"/>
                                <input type="email" defaultValue="alex.pall@example.com" className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                            </div>
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <PhoneIcon className="absolute left-3 top-9 w-5 h-5 text-gray-400"/>
                            <input type="tel" defaultValue="+1 555-123-4567" className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                             <textarea rows="4" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" placeholder="Tell us a bit about yourself..."></textarea>
                        </div>
                    </form>
                );
            case 'address':
                return (
                     <form className="space-y-6">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                             <LocationIcon className="absolute left-3 top-9 w-5 h-5 text-gray-400"/>
                            <input type="text" placeholder="e.g., 123 Main St" className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input type="text" placeholder="e.g., New York" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                <input type="text" placeholder="e.g., 10001" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                            </div>
                        </div>
                    </form>
                );
            case 'password':
                return (
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input type="password" placeholder="Enter your current password" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input type="password" placeholder="Enter a new password" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input type="password" placeholder="Confirm your new password" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
                        </div>
                    </form>
                );
            default:
                return null;
        }
    };

    const TabButton = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === tabName ? 'bg-green-500 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}
        >
            {label}
        </button>
    );

    return (
        <div>
            <h2 className="text-3xl font-bold text-[#083d41] mb-8">My Profile</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column - Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="relative inline-block mb-4">
                            <img 
                                src="https://placehold.co/128x128/EBF4FA/333333?text=AP" 
                                alt="Alaxander Pall"
                                className="w-32 h-32 rounded-full mx-auto"
                            />
                            <button className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600">
                                <CameraIcon className="w-4 h-4"/>
                            </button>
                        </div>
                        <h3 className="text-xl font-bold text-[#083d41]">Alaxander Pall</h3>
                        <p className="text-gray-500 text-sm">Valued Customer</p>
                        <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                            Change Picture
                        </button>
                    </div>
                </div>

                {/* Right Column - Settings */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="border-b border-gray-200 mb-6">
                            <nav className="flex flex-wrap items-center gap-2">
                               <TabButton tabName="personal" label="Personal Info" />
                               <TabButton tabName="address" label="Address" />
                               <TabButton tabName="password" label="Password" />
                            </nav>
                        </div>
                        
                        <div>{renderContent()}</div>

                        <div className="mt-8 pt-6 border-t border-gray-200 text-right">
                             <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};


// To use this, you'd render it inside the main layout like this:
// export default function App() {
//     return (
//         <UserDashboardLayout>
//             <ProfilePage />
//         </UserDashboardLayout>
//     );
// }
// For this example, we export the component directly.
export default ProfilePage;
