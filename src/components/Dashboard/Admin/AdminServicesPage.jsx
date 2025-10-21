import React, { useEffect, useState } from "react";
import authApiClient from "../../../services/auth-api-client"; // ← adjust path if needed
import { Link } from "react-router-dom";

// --- SVG Icon Components ---
const HomeIcon = () => (
  <svg
    className="w-10 h-10 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);
const OfficeIcon = () => (
  <svg
    className="w-10 h-10 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1m-5-4h1"
    />
  </svg>
);
const WindowIcon = () => (
  <svg
    className="w-10 h-10 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16M6 4v16m12-16v16"
    />
  </svg>
);
const CarpetIcon = () => (
  <svg
    className="w-10 h-10 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);
const EditIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
const DeleteIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

// --- Reusable Admin Service Card Component ---
const AdminServiceCard = ({
  icon,
  title,
  description,
  price,
  editHref,
  onDelete,
  deleting,
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col justify-between">
    <div className="p-6 text-center">
      <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-xl text-[#083d41] mb-1">{title}</h3>
      <p className="text-lg font-bold text-[#083d41] mb-2">{price}</p>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
    <div className="flex border-t">
      <Link
        to={editHref}
        className="w-1/2 flex items-center justify-center py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <EditIcon /> Edit
      </Link>
      <button
        onClick={onDelete}
        disabled={deleting}
        className="w-1/2 flex items-center justify-center py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors border-l disabled:opacity-60"
      >
        <DeleteIcon /> {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  </div>
);

/* ---------------------- Helpers ---------------------- */

const formatPrice = (n, currency = "USD") =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(n) || 0);

const pickIcon = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("office")) return <OfficeIcon />;
  if (t.includes("window")) return <WindowIcon />;
  if (t.includes("carpet")) return <CarpetIcon />;
  if (t.includes("kitchen")) return <OfficeIcon />;
  if (t.includes("move") || t.includes("in/out") || t.includes("out"))
    return <HomeIcon />;
  return <HomeIcon />;
};

const apiServiceToCard = (s) => {
  const title = s?.name || s?.title || "Service";
  const description =
    s?.description ||
    s?.details ||
    "Quality service provided by our professional team.";
  const rawPrice =
    s?.price_with_tax ??
    s?.priceWithTax ??
    s?.total_with_tax ??
    s?.total_price ??
    s?.price ??
    0;

  return {
    id: s?.id,
    icon: pickIcon(title),
    title,
    description,
    price: formatPrice(rawPrice),
  };
};

// DRF pagination helper: fetch all pages
const fetchAllPaginated = async (endpoint) => {
  const pageSize = 100;
  let page = 1;
  let out = [];

  let { data } = await authApiClient.get(endpoint, {
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
    ({ data } = await authApiClient.get(endpoint, {
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

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [collectionType, setCollectionType] = useState("products"); // or 'services'
  const [collectionBase, setCollectionBase] = useState(null); // e.g. '/api/v1/products/' or '/products/'
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const base = authApiClient?.defaults?.baseURL || "";
    const resolve = (p) =>
      /\/api\/v1\/?$/i.test(base) ? p.replace("/api/v1", "") : p;

    // Try likely endpoints in order; first one that returns data wins
    const candidates = [
      resolve("/api/v1/products/"),
      resolve("/products/"),
      resolve("/api/v1/services/"),
      resolve("/services/"),
    ];

    (async () => {
      try {
        setLoading(true);
        for (const ep of candidates) {
          try {
            const list = await fetchAllPaginated(ep);
            if (list && list.length) {
              setCollectionType(
                ep.toLowerCase().includes("services") ? "services" : "products"
              );
              // normalize to have trailing slash
              const normalized = ep.endsWith("/") ? ep : `${ep}/`;
              setCollectionBase(normalized);

              const cards = list.map(apiServiceToCard);
              if (!cancelled) setServices(cards);
              return;
            }
          } catch {
            // try next endpoint
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!collectionBase || !id) return;

    const ok = window.confirm("Are you sure you want to delete this item?");
    if (!ok) return;

    try {
      setDeletingId(id);
      // DELETE /<collection>/<id>/
      await authApiClient.delete(`${collectionBase}${id}/`);
      // Optimistically remove from UI
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      alert("Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#083d41]">Manage Services</h2>
          <p className="text-gray-500">
            Add, edit, or remove company services.
          </p>
        </div>
        <Link
          to={`/admin/${collectionType}/new`}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-lg transition-colors"
        >
          + Add New Service
        </Link>
      </div>

      {/* Services Grid (design unchanged) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md h-56 animate-pulse"
            />
          ))
        ) : services.length > 0 ? (
          services.map((service) => (
            <AdminServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              price={service.price}
              editHref={`/admin/${collectionType}/${service.id}/edit`}
              onDelete={() => handleDelete(service.id)}
              deleting={deletingId === service.id}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No services found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServicesPage;
