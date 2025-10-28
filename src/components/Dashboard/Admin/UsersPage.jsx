import React, { useState, useMemo, useEffect } from "react";
import authApiClient from "../../../services/auth-api-client"; // ← adjust path if needed

// --- SVG Icon Components ---
const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const ChevronLeftIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);
const ChevronRightIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);
const DotsVerticalIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 5v.01M12 12v.01M12 19v.01"
    />
  </svg>
);

// This is a placeholder for the actual layout component from your AdminDashboard.
const AdminDashboardLayout = ({ children }) => (
  <div className="font-sans bg-gray-100 min-h-screen">
    <aside className="hidden lg:fixed lg:inset-y-0 lg:w-64 lg:flex lg:flex-col bg-[#083d41] p-4">
      <h1 className="text-3xl font-bold text-white text-center">
        HCH <span className="text-green-400">Admin</span>
      </h1>
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

/* ---------------- Helpers to match your existing UI shape ---------------- */

const toDateOnly = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`; // e.g., 2025-10-15
};

const initials = (first = "", last = "") => {
  const a = (first.trim()[0] || "").toUpperCase();
  const b = (last.trim()[0] || "").toUpperCase();
  return a + b || first[0]?.toUpperCase() || last[0]?.toUpperCase() || "U";
};

const mapRole = (role = "") => {
  const r = String(role).toLowerCase();
  if (r === "worker" || r === "staff" || r === "team" || r === "teammember")
    return "Team Member";
  if (r === "admin" || r === "administrator") return "Admin";
  if (r === "client" || r === "customer" || r === "user") return "Client";
  return role || "Client";
};

const mapStatus = (is_active) => (is_active === false ? "Suspended" : "Active");

// Convert API user -> your table row
const apiUserToRow = (u) => ({
  id: u?.id,
  name:
    `${u?.first_name || ""} ${u?.last_name || ""}`.trim() || u?.email || "User",
  email: u?.email || "",
  role: mapRole(u?.role),
  joinDate: toDateOnly(u?.date_joined || u?.created_at || u?.updated_at || ""),
  status: mapStatus(u?.is_active),
  avatar: initials(u?.first_name, u?.last_name),
});

/* ---------------- Component ---------------- */

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // dynamic users replace hard-coded array
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users on mount (handles DRF pagination: {count,next,previous,results})
  useEffect(() => {
    let cancelled = false;

    const base = authApiClient?.defaults?.baseURL || "";
    const usersPath = /\/api\/v1\/?$/i.test(base)
      ? "/users/"
      : "/api/v1/users/";

    const fetchAll = async () => {
      const pageSize = 100;
      let page = 1;
      let out = [];

      // first page
      let { data } = await authApiClient.get(usersPath, {
        params: { page, page_size: pageSize },
      });
      let list = Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data)
        ? data
        : [];
      out = out.concat(list);

      const count = Number.isFinite(data?.count) ? data.count : out.length;
      const totalPages = Math.max(1, Math.ceil(count / pageSize));

      while (page < totalPages) {
        page += 1;
        ({ data } = await authApiClient.get(usersPath, {
          params: { page, page_size: pageSize },
        }));
        list = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
          ? data
          : [];
        out = out.concat(list);
      }
      return out;
    };

    (async () => {
      try {
        setLoading(true);
        const users = await fetchAll();
        if (cancelled) return;
        const rows = users.map(apiUserToRow);

        // Stable sort: newest joinDate first (empty dates last)
        rows.sort((a, b) => {
          if (!a.joinDate && !b.joinDate) return 0;
          if (!a.joinDate) return 1;
          if (!b.joinDate) return -1;
          return a.joinDate < b.joinDate ? 1 : -1;
        });

        setAllUsers(rows);
      } catch (e) {
        // If fetch fails, leave list empty and show your "No users..." state
        // console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return allUsers
      .filter((u) => roleFilter === "All" || u.role === roleFilter)
      .filter(
        (u) =>
          !term ||
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
      );
  }, [searchTerm, roleFilter, allUsers]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-center gap-4">
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          >
            <option value="All">All Roles</option>
            <option value="Client">Client</option>
            <option value="Admin">Admin</option>
          </select>
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
                <th className="py-3 px-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 px-4 text-center text-gray-500"
                  >
                    Loading…
                  </td>
                </tr>
              ) : currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-[#083d41]">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-800">{user.role}</td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    No users match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg bg-white border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
//   return (
//     <AdminDashboardLayout>
//       <UsersPage />
//     </AdminDashboardLayout>
//   );
// }
// For this example, we export the component directly.
export default UsersPage;
