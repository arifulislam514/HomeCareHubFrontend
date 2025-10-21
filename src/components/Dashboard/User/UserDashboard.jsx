import React, { useEffect, useMemo, useState } from "react";
import authApiClient from "../../../services/auth-api-client";

// ---- Helpers ----
const formatCurrency = (amount, currency = "USD") =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0);

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d)
    ? String(iso)
    : d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

const toRow = (o) => {
  const id = o?.id;
  const code =
    typeof id === "string" ? `#${id.slice(0, 8).toUpperCase()}` : `#${id}`;
  const firstItem = o?.items?.[0];
  const service = firstItem?.product?.name || "Service";
  return {
    id,
    code,
    service,
    status: o?.status || "",
    date: o?.created_at || "",
    price: o?.total_price ?? 0,
  };
};

const bucketStatus = (statusRaw = "") => {
  const s = statusRaw.toLowerCase().trim();
  if (["completed", "paid", "delivered", "fulfilled"].includes(s))
    return "completed";
  if (["cancelled", "canceled", "failed", "refunded"].includes(s))
    return "cancelled";
  if (
    ["not paid", "pending", "processing", "confirmed", "scheduled"].includes(s)
  )
    return "upcoming";
  return "upcoming";
};

export default function UserDashboard() {
  const [me, setMe] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const base = authApiClient?.defaults?.baseURL || "";
    const mePath = /\/api\/v1\/?$/i.test(base)
      ? "/users/me/"
      : "/api/v1/users/me/";
    const ordersPath = /\/api\/v1\/?$/i.test(base)
      ? "/orders/"
      : "/api/v1/orders/";

    (async () => {
      try {
        const [{ data: meData }, ordersResp] = await Promise.all([
          authApiClient.get(mePath),
          authApiClient.get(ordersPath, {
            params: { ordering: "-created_at", page_size: 5 },
          }),
        ]);
        if (!cancelled) {
          setMe(meData || null);
          const raw = ordersResp?.data;
          const arr = Array.isArray(raw)
            ? raw
            : Array.isArray(raw?.results)
            ? raw.results
            : [];
          const rows = arr
            .map(toRow)
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .slice(0, 5);
          setOrders(rows);
        }
      } catch (e) {
        if (!cancelled) setError("Failed to load dashboard data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const greetingName = me?.first_name || "there";
  const stats = useMemo(() => {
    let upcoming = 0,
      completed = 0;
    for (const r of orders) {
      const b = bucketStatus(r.status);
      if (b === "completed") completed += 1;
      else if (b === "upcoming") upcoming += 1;
    }
    return { upcoming, completed };
  }, [orders]);

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Welcome back, {greetingName}!
        </h1>
      </header>

      {/* Feedback */}
      {loading && (
        <p className="text-sm text-gray-500">Loading your dashboard…</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Stat tiles */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">Upcoming Cleanings</div>
          <div className="mt-2 text-3xl font-semibold">{stats.upcoming}</div>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">Completed Services</div>
          <div className="mt-2 text-3xl font-semibold">{stats.completed}</div>
        </div>
      </section>

      {/* Recent bookings */}
      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">Booking ID</th>
                <th className="px-4 py-2 font-medium">Service</th>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No recent bookings.
                  </td>
                </tr>
              ) : (
                orders.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{r.code}</td>
                    <td className="px-4 py-3">{r.service}</td>
                    <td className="px-4 py-3">{formatDate(r.date)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          {
                            upcoming:
                              "inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700",
                            completed:
                              "inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-50 text-green-700",
                            cancelled:
                              "inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-50 text-red-700",
                          }[bucketStatus(r.status)] ||
                          "inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                        }
                      >
                        {r.status || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {formatCurrency(r.price, "USD")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
