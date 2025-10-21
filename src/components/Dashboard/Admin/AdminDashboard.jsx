import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import SidebarContent from '../Admin/Sidebar';
import authApiClient from '../../../services/auth-api-client'; // ⬅️ add this (path may be ../.. depending on your tree)

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
    <p className={`text-sm mt-2 ${String(change).startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
      {change} vs last month
    </p>
  </div>
);

const currency = (n) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0);

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ---------- NEW: dynamic state ----------
  const [me, setMe] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [newBookings, setNewBookings] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [pendingServices, setPendingServices] = useState(0);

  // (Optional) month-over-month deltas; placeholder computed from data below.
  const [deltaRevenue, setDeltaRevenue] = useState('+0%');
  const [deltaBookings, setDeltaBookings] = useState('+0%');
  const [deltaUsers, setDeltaUsers] = useState('+0%');
  const [deltaPending, setDeltaPending] = useState('+0%');

  const monthlyBookingsChartRef = useRef(null);
  const serviceDistributionChartRef = useRef(null);

  const monthlyChartRef = useRef(null);
  const serviceChartRef = useRef(null);

  // Helpers
  const base = authApiClient?.defaults?.baseURL || '';
  const path = (p) => (/\/api\/v1\/?$/i.test(base) ? p.replace('/api/v1', '') : p);

  // Fetch all pages from a DRF-style paginated endpoint
  const fetchAll = async (endpoint, params = {}) => {
    let url = path(endpoint);
    let out = [];
    let page = 1;

    // If the API supports page_size, start large-ish to reduce calls
    const baseParams = { page_size: 100, ...params };

    // First request
    let resp = await authApiClient.get(url, { params: { ...baseParams, page } });
    let data = resp.data;
    let list = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
    out = out.concat(list);

    // If there's a count and we used page_size, loop
    const count = Number.isFinite(data?.count) ? data.count : out.length;
    const totalPages = Math.max(1, Math.ceil(count / baseParams.page_size));

    while (page < totalPages) {
      page += 1;
      resp = await authApiClient.get(url, { params: { ...baseParams, page } });
      data = resp.data;
      list = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
      out = out.concat(list);
    }
    return out;
  };

  // Build last 6 month labels like ['May','Jun','Jul','Aug','Sep','Oct']
  const lastSixMonthLabels = () => {
    const labels = [];
    const d = new Date();
    for (let i = 5; i >= 0; i--) {
      const t = new Date(d.getFullYear(), d.getMonth() - i, 1);
      labels.push(t.toLocaleString(undefined, { month: 'short' }));
    }
    return labels;
  };

  const monthKey = (iso) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  };

  const isInLast30Days = (iso) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return false;
    const now = Date.now();
    return (now - d.getTime()) <= 30 * 24 * 60 * 60 * 1000;
  };

  // ---------- Fetch & compute on mount ----------
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // 1) me (optional avatar for header)
        try {
          const mePath = path('/api/v1/users/me/');
          const { data } = await authApiClient.get(mePath);
          if (!cancelled) setMe(data);
        } catch { /* non-blocking */ }

        // 2) users count (Active Users)
        try {
          const usersPath = path('/api/v1/users/');
          // Only need the count; fetch minimal page
          const { data } = await authApiClient.get(usersPath, { params: { page_size: 1 } });
          const cnt = Number.isFinite(data?.count) ? data.count : (Array.isArray(data) ? data.length : 0);
          if (!cancelled) setActiveUsers(cnt);
        } catch { /* ignore users errors for now */ }

        // 3) orders (revenue, new bookings, pending services, charts)
        const orders = await fetchAll('/api/v1/orders/', { ordering: '-created_at' });
        if (cancelled) return;

        // Aggregate totals
        let revenue = 0;
        let newBk = 0;
        let pending = 0;

        // Status buckets for "pending"
        const pendingSet = new Set(['not paid', 'pending', 'processing']);

        // Per-month buckets (YYYY-MM => count)
        const monthlyCounts = new Map();
        // Service distribution (by first item product name)
        const serviceCounts = new Map();

        for (const o of orders) {
          // revenue
          const price = Number(o?.total_price) || 0;
          revenue += price;

          // new bookings (created within last 30 days)
          if (isInLast30Days(o?.created_at)) newBk += 1;

          // pending
          const st = String(o?.status || '').toLowerCase().trim();
          if (pendingSet.has(st)) pending += 1;

          // monthly
          const mk = monthKey(o?.created_at);
          if (mk) monthlyCounts.set(mk, (monthlyCounts.get(mk) || 0) + 1);

          // service distribution
          const name = o?.items?.[0]?.product?.name || 'Service';
          serviceCounts.set(name, (serviceCounts.get(name) || 0) + 1);
        }

        if (!cancelled) {
          setTotalRevenue(revenue);
          setNewBookings(newBk);
          setPendingServices(pending);

          // crude month-over-month deltas (based on last 2 months count/revenue)
          const now = new Date();
          const ym = (y, m) => `${y}-${String(m + 1).padStart(2, '0')}`;
          const currKey = ym(now.getFullYear(), now.getMonth());
          const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const prevKey = ym(prev.getFullYear(), prev.getMonth());

          const currCount = monthlyCounts.get(currKey) || 0;
          const prevCount = monthlyCounts.get(prevKey) || 0;
          const bookingsDelta = prevCount === 0 ? '+0%' : `${((currCount - prevCount) / prevCount * 100).toFixed(1)}%`;
          setDeltaBookings(bookingsDelta);

          // revenue MoM (very rough: assume avg revenue per booking * counts)
          // If you want, replace with a real per-order per-month revenue bucketing.
          const revPerBk = revenue / Math.max(1, orders.length);
          const currRev = currCount * revPerBk;
          const prevRev = prevCount * revPerBk;
          const revDelta = prevRev === 0 ? '+0%' : `${((currRev - prevRev) / prevRev * 100).toFixed(1)}%`;
          setDeltaRevenue(revDelta);

          // users & pending mock deltas to keep card text consistent
          setDeltaUsers('+0.0%');
          setDeltaPending('-0.0%');

          // ----- Charts -----
          // Monthly Bookings (last 6 months)
          const labels = lastSixMonthLabels(); // e.g., ['May','Jun',...]
          // Build keys parallel to labels
          const keys = [];
          const d = new Date();
          for (let i = 5; i >= 0; i--) {
            const t = new Date(d.getFullYear(), d.getMonth() - i, 1);
            keys.push(`${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}`);
          }
          const monthData = keys.map(k => monthlyCounts.get(k) || 0);

          // Service distribution (top 4)
          const svcEntries = Array.from(serviceCounts.entries()).sort((a, b) => b[1] - a[1]);
          const svcLabels = svcEntries.slice(0, 4).map(([k]) => k);
          const svcData = svcEntries.slice(0, 4).map(([, v]) => v);

          // Create / update charts
          // Destroy old instances if present
          if (monthlyChartRef.current) monthlyChartRef.current.destroy();
          if (serviceChartRef.current) serviceChartRef.current.destroy();

          if (monthlyBookingsChartRef.current) {
            const ctx = monthlyBookingsChartRef.current.getContext('2d');
            monthlyChartRef.current = new Chart(ctx, {
              type: 'bar',
              data: {
                labels,
                datasets: [{
                  label: 'Bookings',
                  data: monthData,
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
            const ctx = serviceDistributionChartRef.current.getContext('2d');
            serviceChartRef.current = new Chart(ctx, {
              type: 'doughnut',
              data: {
                labels: svcLabels.length ? svcLabels : ['No Data'],
                datasets: [{
                  data: svcData.length ? svcData : [1],
                  backgroundColor: ['#10b981', '#2dd4bf', '#34d399', '#6ee7b7'],
                  hoverOffset: 4
                }]
              },
              options: { responsive: true, maintainAspectRatio: false }
            });
          }
        }
      } catch (e) {
        // If anything fails, the UI still shows, with zeros/seeded visuals
        // console.error(e);
      }
    })();

    return () => {
      // Cleanup chart instances on unmount
      if (monthlyChartRef.current) monthlyChartRef.current.destroy();
      if (serviceChartRef.current) serviceChartRef.current.destroy();
    };
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
            <img
              src={
                me?.avatar
                  ? (new URL(me.avatar, authApiClient?.defaults?.baseURL || '').href)
                  : "https://placehold.co/40x40/EBF4FA/333333?text=A"
              }
              alt="Admin"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        <div className="flex-grow p-6 sm:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <AdminStatCard
              title="Total Revenue"
              value={currency(totalRevenue)}
              change={deltaRevenue}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
              color="bg-green-500/20 text-green-600"
            />
            <AdminStatCard
              title="New Bookings"
              value={newBookings}
              change={deltaBookings}
              icon={<BookingsIcon />}
              color="bg-blue-500/20 text-blue-600"
            />
            <AdminStatCard
              title="Active Users"
              value={activeUsers}
              change={deltaUsers}
              icon={<UsersIcon />}
              color="bg-yellow-500/20 text-yellow-600"
            />
            <AdminStatCard
              title="Pending Services"
              value={pendingServices}
              change={deltaPending}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              color="bg-red-500/20 text-red-600"
            />
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
