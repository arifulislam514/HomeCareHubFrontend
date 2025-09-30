import React, { useState, useMemo } from 'react';

// --- SVG Icon Components ---
const SearchIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const FilterIcon = () => <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17V6.414L3.293 3.707A1 1 0 013 3V4z" /></svg>;
const ChevronLeftIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const ChevronRightIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const DotsVerticalIcon = () => <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" /></svg>;

// This is a placeholder for the actual layout component from your AdminDashboard.
const AdminDashboardLayout = ({ children }) => (
    <div className="font-sans bg-gray-100 min-h-screen">
        <aside className="hidden lg:fixed lg:inset-y-0 lg:w-64 lg:flex lg:flex-col bg-[#083d41] p-4">
            <h1 className="text-3xl font-bold text-white text-center">HCH <span className="text-green-400">Admin</span></h1>
            {/* Nav links would go here */}
        </aside>
        <main className="lg:pl-64 flex flex-col min-h-screen">
            <header className="sticky top-0 z-30 bg-white shadow-sm p-4">
                <h1 className="text-xl font-bold text-[#083d41]">Manage Bookings</h1>
            </header>
            <div className="flex-grow p-6 sm:p-8">{children}</div>
        </main>
    </div>
);


const ManageBookingsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 8;

    const allBookings = [
        // This is sample data. In a real application, this would come from an API.
        { id: '#1234', client: 'Alaxander Pall', date: '2025-10-15', service: 'Deep House Clean', status: 'Upcoming', price: '$150', team: ['A', 'B'] },
        { id: '#1233', client: 'Jane Doe', date: '2025-09-28', service: 'Office Cleaning', status: 'Completed', price: '$250', team: ['C'] },
        { id: '#1232', client: 'John Smith', date: '2025-09-10', service: 'Kitchen Cleaning', status: 'Completed', price: '$80', team: ['A'] },
        { id: '#1231', client: 'Emily White', date: '2025-08-22', service: 'Window Cleaning', status: 'Cancelled', price: '$120', team: [] },
        { id: '#1230', client: 'Michael Brown', date: '2025-10-20', service: 'Deep House Clean', status: 'Upcoming', price: '$150', team: ['B', 'D'] },
        { id: '#1229', client: 'Sarah Green', date: '2025-07-05', service: 'Carpet Cleaning', status: 'Completed', price: '$180', team: ['A', 'C'] },
        { id: '#1228', client: 'David Black', date: '2025-10-25', service: 'Office Cleaning', status: 'Upcoming', price: '$300', team: ['D'] },
        { id: '#1227', client: 'Laura Blue', date: '2025-06-18', service: 'Living Room Clean', status: 'Completed', price: '$90', team: ['B'] },
        { id: '#1226', client: 'James Indigo', date: '2025-05-30', service: 'Deep House Clean', status: 'Completed', price: '$160', team: ['A', 'D'] },
    ];
    
    const filteredBookings = useMemo(() => {
        return allBookings
            .filter(b => statusFilter === 'All' || b.status === statusFilter)
            .filter(b => 
                b.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, statusFilter]);

    const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
    const currentBookings = filteredBookings.slice((currentPage - 1) * bookingsPerPage, currentPage * bookingsPerPage);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Upcoming': return 'bg-blue-100 text-blue-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    return (
        <div>
            {/* Header and Filters */}
            <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
                <div className="relative w-full sm:w-64">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="flex items-center gap-4">
                     <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
                        + Add Booking
                    </button>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr className="text-gray-600 text-sm">
                                <th className="py-3 px-4 font-semibold">Booking ID</th>
                                <th className="py-3 px-4 font-semibold">Client</th>
                                <th className="py-3 px-4 font-semibold">Date</th>
                                <th className="py-3 px-4 font-semibold">Service</th>
                                <th className="py-3 px-4 font-semibold">Team</th>
                                <th className="py-3 px-4 font-semibold text-center">Status</th>
                                <th className="py-3 px-4 font-semibold text-right">Price</th>
                                <th className="py-3 px-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentBookings.map(booking => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="py-4 px-4 font-semibold text-[#083d41]">{booking.id}</td>
                                    <td className="py-4 px-4 text-gray-800">{booking.client}</td>
                                    <td className="py-4 px-4 text-gray-600">{booking.date}</td>
                                    <td className="py-4 px-4 text-gray-800">{booking.service}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex -space-x-2">
                                            {booking.team.map(member => (
                                                <img key={member} className="w-8 h-8 rounded-full border-2 border-white" src={`https://placehold.co/40x40/EBF4FA/333333?text=${member}`} alt={`Team member ${member}`} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right font-semibold text-[#083d41]">{booking.price}</td>
                                    <td className="py-4 px-4 text-center">
                                        <button className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200"><DotsVerticalIcon/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {filteredBookings.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No bookings match your criteria.
                    </div>
                )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-lg bg-white border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
                        >
                            <ChevronLeftIcon />
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-lg bg-white border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// To use this, you would render it inside the main layout like this:
// export default function App() {
//     return (
//         <AdminDashboardLayout>
//             <ManageBookingsPage />
//         </AdminDashboardLayout>
//     );
// }
// For this example, we export the component directly.
export default ManageBookingsPage;
