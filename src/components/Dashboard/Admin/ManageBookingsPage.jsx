import React, { useState, useMemo, useEffect } from "react";
import authApiClient from "../../../services/auth-api-client"; // ← keep

// --- SVG Icon Components (unchanged) ---
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
const FilterIcon = () => (
  <svg
    className="w-5 h-5 ml-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L12 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 016 17V6.414L3.293 3.707A1 1 0 013 3V4z"
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

// ---- Helpers ----
const toDateOnly = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

const formatPrice = (amount) => {
  const n = Number(amount);
  if (!Number.isFinite(n)) return String(amount ?? "");
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
};

const normalizeStatus = (status = "") => {
  const s = String(status).toLowerCase().trim();
  if (s === "unpaid") return "Unpaid";
  if (s === "pending") return "Pending";
  if (s === "complete" || s === "completed") return "Complete";
  if (s === "canceled" || s === "cancelled") return "Canceled";
  return status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unpaid";
};

// Keep a list we can render + send back
const STATUS_CHOICES = ["Unpaid", "Pending", "Complete", "Canceled"];

// Turn a raw order into your table row shape (now includes rawId)
const orderToRow = (o, usersById) => {
  const rawId = o?.id;
  const idStr =
    typeof rawId === "string"
      ? `#${rawId.slice(0, 8).toUpperCase()}`
      : `#${rawId}`;
  const userId = o?.user;
  const user = usersById.get(userId);
  const client =
    user?.first_name || user?.last_name
      ? `${user?.first_name || ""} ${user?.last_name || ""}`.trim()
      : user?.email || `User ${userId}`;
  return {
    rawId, // <— needed for PATCH
    id: idStr,
    client,
    date: toDateOnly(o?.created_at || o?.scheduled_date),
    service: o?.items?.[0]?.product?.name || "Service",
    status: normalizeStatus(o?.status),
    price: formatPrice(o?.total_price ?? 0),
    team: [],
  };
};

const ManageBookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 8;

  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null); // track which row is saving

  // Build endpoints safely from baseURL
  const base = authApiClient?.defaults?.baseURL || "";
  const hasApiV1 = /\/api\/v1\/?$/i.test(base);
  const usersPath = hasApiV1 ? "/users/" : "/api/v1/users/";
  const ordersPath = hasApiV1 ? "/orders/" : "/api/v1/orders/";

  // Fetch users + orders
  useEffect(() => {
    let cancelled = false;

    const fetchAll = async (endpoint, params = {}) => {
      const pageSize = 100;
      let page = 1;
      let out = [];
      let { data } = await authApiClient.get(endpoint, {
        params: { page, page_size: pageSize, ...params },
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
        ({ data } = await authApiClient.get(endpoint, {
          params: { page, page_size: pageSize, ...params },
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
        const users = await fetchAll(usersPath, { page_size: 100 });
        const usersById = new Map(users.map((u) => [u.id, u]));
        const orders = await fetchAll(ordersPath, { ordering: "-created_at" });
        if (cancelled) return;
        const rows = orders.map((o) => orderToRow(o, usersById));
        rows.sort((a, b) => (a.date < b.date ? 1 : -1));
        setAllBookings(rows);
      } catch {
        // swallow
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line

  const filteredBookings = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return allBookings
      .filter((b) => statusFilter === "All" || b.status === statusFilter)
      .filter(
        (b) =>
          !term ||
          b.client.toLowerCase().includes(term) ||
          b.service.toLowerCase().includes(term) ||
          b.id.toLowerCase().includes(term)
      );
  }, [searchTerm, statusFilter, allBookings]);

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage) || 1;
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Unpaid":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-blue-100 text-blue-800";
      case "Complete":
        return "bg-green-100 text-green-800";
      case "Canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // --- NEW: update status handler ---
  const updateOrderStatus = async (rawId, nextStatus) => {
    // Build endpoint like /orders/{id}/update_status/
    const endpoint = `${ordersPath}${rawId}/update_status/`;

    // optimistic UI
    const prev = allBookings;
    const next = allBookings.map((b) =>
      b.rawId === rawId ? { ...b, status: nextStatus } : b
    );
    setAllBookings(next);
    setSavingId(rawId);

    try {
      // API expects { status: "<choice>" }
      await authApiClient.patch(endpoint, { status: nextStatus });
      // success toast (optional)
      // window.alert("Order status updated");
    } catch (err) {
      // rollback on error
      setAllBookings(prev);
      window.alert("Failed to update status. Please try again.");
    } finally {
      setSavingId(null);
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          >
            <option value="All">All Statuses</option>
            {STATUS_CHOICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
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
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-8 px-4 text-center text-gray-500"
                  >
                    Loading…
                  </td>
                </tr>
              ) : currentBookings.length > 0 ? (
                currentBookings.map((booking) => (
                  <tr
                    key={booking.rawId || booking.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="py-4 px-4 font-semibold text-[#083d41]">
                      {booking.id}
                    </td>
                    <td className="py-4 px-4 text-gray-800">
                      {booking.client}
                    </td>
                    <td className="py-4 px-4 text-gray-600">{booking.date}</td>
                    <td className="py-4 px-4 text-gray-800">
                      {booking.service}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex -space-x-2">
                        {booking.team.map((member) => (
                          <img
                            key={member}
                            className="w-8 h-8 rounded-full border-2 border-white"
                            src={`https://placehold.co/40x40/EBF4FA/333333?text=${member}`}
                            alt={`Team member ${member}`}
                          />
                        ))}
                      </div>
                    </td>

                    {/* --- NEW: editable Status cell --- */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right font-semibold text-[#083d41]">
                      {booking.price}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <select
                          disabled={savingId === booking.rawId}
                          value={booking.status}
                          onChange={(e) =>
                            updateOrderStatus(booking.rawId, e.target.value)
                          }
                          className="text-xs px-2 py-1 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring focus:ring-green-200"
                          title="Change status"
                          aria-label={`Change status for ${booking.id}`}
                        >
                          {STATUS_CHOICES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>

                        <button
                          className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200"
                          title="More actions"
                        >
                          <DotsVerticalIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    No bookings match your criteria.
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

export default ManageBookingsPage;
