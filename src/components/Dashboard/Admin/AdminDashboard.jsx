import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import SidebarContent from '../Admin/Sidebar';

// --- SVG Icon Components ---
const DashboardIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const BookingsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
);
const UsersIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-6-6h6zm6 0a6 6 0 00-9-5.197M15 21a6 6 0 00-6-6h6z" /></svg>
);
const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);


const AdminStatCard = ({ title, value, change, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-3xl font-bold text-[#083d41] mt-1">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
                {icon}
            </div>
        </div>
        <p className={`text-sm mt-2 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change} vs last month
        </p>
    </div>
);


const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const monthlyBookingsChartRef = useRef(null);
    const serviceDistributionChartRef = useRef(null);
    
    useEffect(() => {
        let monthlyChart, serviceChart;
        
        if (monthlyBookingsChartRef.current) {
            const monthlyCtx = monthlyBookingsChartRef.current.getContext('2d');
            monthlyChart = new Chart(monthlyCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Bookings',
                        data: [65, 59, 80, 81, 56, 55],
                        backgroundColor: 'rgba(74, 222, 128, 0.6)',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        borderWidth: 1,
                        borderRadius: 5,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                }
            });
        }

        if (serviceDistributionChartRef.current) {
            const serviceCtx = serviceDistributionChartRef.current.getContext('2d');
            serviceChart = new Chart(serviceCtx, {
                type: 'doughnut',
                data: {
                    labels: ['House Clean', 'Office Clean', 'Deep Clean', 'Window Clean'],
                    datasets: [{
                        data: [300, 150, 100, 50],
                        backgroundColor: ['#10b981', '#2dd4bf', '#34d399', '#6ee7b7'],
                        hoverOffset: 4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
        
        return () => {
            if(monthlyChart) monthlyChart.destroy();
            if(serviceChart) serviceChart.destroy();
        }
    }, []);
    
    return (
        <div className="font-sans bg-gray-100 min-h-screen">
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="absolute inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
            </div>

            <main className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-30 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-500 lg:hidden"><MenuIcon /></button>
                    <h1 className="text-2xl font-bold text-[#083d41] hidden lg:block">Dashboard Overview</h1>
                    <div className="flex items-center space-x-4">
                        <input type="date" className="border rounded-lg px-2 py-1 text-sm"/>
                        <img src="https://placehold.co/40x40/EBF4FA/333333?text=A" alt="Admin" className="w-10 h-10 rounded-full"/>
                    </div>
                </header>

                <div className="flex-grow p-6 sm:p-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                        <AdminStatCard title="Total Revenue" value="$25,480" change="+12.5%" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} color="bg-green-500/20 text-green-600" />
                        <AdminStatCard title="New Bookings" value="275" change="+8.2%" icon={<BookingsIcon />} color="bg-blue-500/20 text-blue-600" />
                        <AdminStatCard title="Active Users" value="1,240" change="+2.1%" icon={<UsersIcon />} color="bg-yellow-500/20 text-yellow-600" />
                        <AdminStatCard title="Pending Services" value="12" change="-5.4%" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="bg-red-500/20 text-red-600" />
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-bold text-[#083d41] mb-4">Bookings per Month</h3>
                            <div className="h-80"><canvas ref={monthlyBookingsChartRef}></canvas></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-bold text-[#083d41] mb-4">Service Distribution</h3>
                            <div className="h-80"><canvas ref={serviceDistributionChartRef}></canvas></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
