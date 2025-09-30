import React from 'react';

// --- SVG Icon Components ---
const HomeIcon = () => <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const OfficeIcon = () => <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1m-5-4h1" /></svg>;
const WindowIcon = () => <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16M6 4v16m12-16v16" /></svg>;
const CarpetIcon = () => <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
const EditIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const DeleteIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;


// This is a placeholder for the actual layout component from your AdminDashboard.
const AdminDashboardLayout = ({ children }) => (
    <div className="font-sans bg-gray-100 min-h-screen">
        <aside className="hidden lg:fixed lg:inset-y-0 lg:w-64 lg:flex lg:flex-col bg-[#083d41] p-4">
            <h1 className="text-3xl font-bold text-white text-center">HCH <span className="text-green-400">Admin</span></h1>
            {/* Nav links would go here */}
        </aside>
        <main className="lg:pl-64 flex flex-col min-h-screen">
            <header className="sticky top-0 z-30 bg-white shadow-sm p-4">
                <h1 className="text-xl font-bold text-[#083d41]">Manage Services</h1>
            </header>
            <div className="flex-grow p-6 sm:p-8">{children}</div>
        </main>
    </div>
);


// --- Reusable Admin Service Card Component ---
const AdminServiceCard = ({ icon, title, description }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col justify-between">
        <div className="p-6 text-center">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                {icon}
            </div>
            <h3 className="font-bold text-xl text-[#083d41] mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div className="flex border-t">
            <button className="w-1/2 flex items-center justify-center py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                <EditIcon /> Edit
            </button>
            <button className="w-1/2 flex items-center justify-center py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors border-l">
                <DeleteIcon /> Delete
            </button>
        </div>
    </div>
);


const AdminServicesPage = () => {
    const services = [
        { icon: <HomeIcon />, title: "House Cleaning", description: "Comprehensive cleaning for your entire home." },
        { icon: <OfficeIcon />, title: "Office Cleaning", description: "Professional and reliable cleaning for commercial spaces." },
        { icon: <WindowIcon />, title: "Window Cleaning", description: "Streak-free window cleaning for residential and commercial properties." },
        { icon: <CarpetIcon />, title: "Carpet Cleaning", description: "Deep steam cleaning for carpets and rugs, removing stains." },
        { icon: <HomeIcon />, title: "Move In/Out Clean", description: "A thorough cleaning service to prepare a home for new occupants." },
        { icon: <OfficeIcon />, title: "Kitchen Deep Clean", description: "Specialized deep cleaning for kitchens, focusing on degreasing." },
    ];

    return (
        <div>
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-[#083d41]">Manage Services</h2>
                    <p className="text-gray-500">Add, edit, or remove company services.</p>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-lg transition-colors">
                    + Add New Service
                </button>
            </div>
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <AdminServiceCard 
                        key={index}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>
        </div>
    );
};


// To use this, you would render it inside the main layout like this:
// export default function App() {
//     return (
//         <AdminDashboardLayout>
//             <AdminServicesPage />
//         </AdminDashboardLayout>
//     );
// }
// For this example, we export the component directly.
export default AdminServicesPage;
