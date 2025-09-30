import React from 'react';

const BookingsIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const CompletedIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>{icon}</div>
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-2xl font-bold text-[#083d41]">{value}</p>
        </div>
    </div>
);

export default function DashboardHomePage() {
    const bookings = [
        { id: '#1234', date: '2025-10-15', service: 'Deep House Clean', status: 'Upcoming', price: '$150' },
        { id: '#1233', date: '2025-09-28', service: 'Office Cleaning', status: 'Completed', price: '$250' },
    ];
    
    const getStatusClass = (status) => {
        if (status === 'Upcoming') return 'bg-blue-100 text-blue-800';
        if (status === 'Completed') return 'bg-green-100 text-green-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#083d41]">Welcome back, Alex!</h2>
                <p className="text-gray-500">Here's your cleaning service overview.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Upcoming Cleanings" value="1" icon={<BookingsIcon />} color="bg-blue-500/20 text-blue-600" />
                <StatCard title="Completed Services" value="24" icon={<CompletedIcon />} color="bg-green-500/20 text-green-600" />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#083d41] mb-4">Recent Bookings</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-sm border-b">
                                <th className="py-3 px-4 font-normal">Booking ID</th><th className="py-3 px-4 font-normal">Date</th><th className="py-3 px-4 font-normal">Service</th><th className="py-3 px-4 font-normal text-center">Status</th><th className="py-3 px-4 font-normal text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="py-4 px-4 font-semibold text-[#083d41]">{booking.id}</td><td className="py-4 px-4 text-gray-700">{booking.date}</td><td className="py-4 px-4 text-gray-700">{booking.service}</td><td className="py-4 px-4 text-center"><span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(booking.status)}`}>{booking.status}</span></td><td className="py-4 px-4 text-right font-semibold text-[#083d41]">{booking.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
