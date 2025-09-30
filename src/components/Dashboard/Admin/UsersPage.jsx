import React, { useState, useMemo } from 'react';

// --- SVG Icon Components ---
const SearchIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
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
                <h1 className="text-xl font-bold text-[#083d41]">Manage Users</h1>
            </header>
            <div className="flex-grow p-6 sm:p-8">{children}</div>
        </main>
    </div>
);


const UsersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;

    const allUsers = [
        // This is sample data. In a real application, this would come from an API.
        { id: 1, name: 'Alaxander Pall', email: 'alex.pall@example.com', role: 'Client', joinDate: '2025-10-15', status: 'Active', avatar: 'AP' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Client', joinDate: '2025-09-28', status: 'Active', avatar: 'JD' },
        { id: 3, name: 'John Smith', email: 'john.smith@example.com', role: 'Team Member', joinDate: '2025-09-10', status: 'Active', avatar: 'JS' },
        { id: 4, name: 'Emily White', email: 'emily.white@example.com', role: 'Client', joinDate: '2025-08-22', status: 'Suspended', avatar: 'EW' },
        { id: 5, name: 'Michael Brown', email: 'michael.brown@example.com', role: 'Client', joinDate: '2025-10-20', status: 'Active', avatar: 'MB' },
        { id: 6, name: 'Sarah Green', email: 'sarah.green@example.com', role: 'Team Member', joinDate: '2025-07-05', status: 'Active', avatar: 'SG' },
        { id: 7, name: 'David Black', email: 'david.black@example.com', role: 'Client', joinDate: '2025-10-25', status: 'Active', avatar: 'DB' },
        { id: 8, name: 'Laura Blue', email: 'laura.blue@example.com', role: 'Admin', joinDate: '2025-06-18', status: 'Active', avatar: 'LB' },
        { id: 9, name: 'James Indigo', email: 'james.indigo@example.com', role: 'Client', joinDate: '2025-05-30', status: 'Active', avatar: 'JI' },
    ];
    
    const filteredUsers = useMemo(() => {
        return allUsers
            .filter(u => roleFilter === 'All' || u.role === roleFilter)
            .filter(u => 
                u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, roleFilter]);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Suspended': return 'bg-red-100 text-red-800';
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
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="flex items-center gap-4">
                     <select 
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    >
                        <option value="All">All Roles</option>
                        <option value="Client">Client</option>
                        <option value="Team Member">Team Member</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
                        + Add User
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr className="text-gray-600 text-sm">
                                <th className="py-3 px-4 font-semibold">User</th>
                                <th className="py-3 px-4 font-semibold">Role</th>
                                <th className="py-3 px-4 font-semibold">Join Date</th>
                                <th className="py-3 px-4 font-semibold text-center">Status</th>
                                <th className="py-3 px-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#083d41]">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-800">{user.role}</td>
                                    <td className="py-4 px-4 text-gray-600">{user.joinDate}</td>
                                    <td className="py-4 px-4 text-center">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <button className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200"><DotsVerticalIcon/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No users match your criteria.
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
//             <UsersPage />
//         </AdminDashboardLayout>
//     );
// }
// For this example, we export the component directly.
export default UsersPage;
