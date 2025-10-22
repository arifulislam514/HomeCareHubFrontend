import React, { useEffect, useState } from "react";
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle,
  Truck,
} from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import apiClient from "../../services/api-client"; // public axios instance
import authApiClient from "../../services/auth-api-client"; // 🔐 auth axios

/* ---------------- helpers: mapping + formatting ---------------- */

const fixBase = (path) => {
  const base =
    apiClient?.defaults?.baseURL || authApiClient?.defaults?.baseURL || "";
  // If baseURL already ends with /api/v1, strip ONLY a leading /api/v1 from path
  return /\/api\/v1\/?$/i.test(base) ? path.replace(/^\/api\/v1/i, "") : path;
};

const toTwo = (n) => (Number.isFinite(Number(n)) ? Number(n) : 0).toFixed(2);

const mapIn = (p = {}) => {
  const name = p.name ?? p.title ?? "Product";
  const description = p.description ?? p.details ?? "";

  // price & sale (prefer *_with_tax)
  const priceRaw =
    p.price_with_tax ?? p.priceWithTax ?? p.total_price ?? p.price ?? 0;
  const saleRaw =
    p.sale_price_with_tax ??
    p.salePriceWithTax ??
    p.discount_price ??
    p.sale_price ??
    null;

  // category/tags
  const category = p.category ?? p.category_name ?? "General";
  const tags =
    (Array.isArray(p.tags) && p.tags) ||
    (typeof p.tags === "string" ? p.tags.split(",").map((t) => t.trim()) : []);

  // images: support string, array of strings, or array of objects with {url}
  let images = [];
  if (Array.isArray(p.images)) {
    images = p.images
      .map((im) => (typeof im === "string" ? im : im?.url))
      .filter(Boolean);
  } else if (p.image) {
    images = [p.image];
  }
  if (images.length === 0) {
    images = [
      "https://placehold.co/600x600/083d41/ffffff?text=Main",
      "https://placehold.co/600x600/22c55e/ffffff?text=Side",
      "https://placehold.co/600x600/eab308/ffffff?text=In+Use",
      "https://placehold.co/600x600/f97316/ffffff?text=Kit",
    ];
  }

  // rating / reviews (fallbacks)
  const rating = Number(p.rating ?? p.stars ?? 4.5);
  const reviews = Number(p.reviews_count ?? p.reviews ?? 128);

  const inStock = p.in_stock ?? p.available ?? p.stock > 0 ?? true;

  return {
    name,
    description,
    price: toTwo(priceRaw),
    salePrice: saleRaw != null ? toTwo(saleRaw) : toTwo(priceRaw),
    rating,
    reviews,
    images,
    category,
    tags,
    inStock: Boolean(inStock),
  };
};

// Build many possible detail URLs and mark their kind
const buildDetailCandidates = (rawId) => {
  const idStr = String(rawId).trim();
  const numeric = /^\d+$/.test(idStr);

  const bases = [
    { base: "/api/v1/products/", kind: "product" },
    { base: "/products/", kind: "product" },
    { base: "/api/v1/services/", kind: "service" },
    { base: "/services/", kind: "service" },
    { base: "/api/v1/product/", kind: "product" },
    { base: "/product/", kind: "product" },
    { base: "/api/v1/service/", kind: "service" },
    { base: "/service/", kind: "service" },
  ];

  const tails = numeric
    ? [`${idStr}/`, `${idStr}`]
    : [`${idStr}/`, `${idStr}`, `slug/${idStr}/`, `slug/${idStr}`];

  const urls = [];
  for (const b of bases) {
    for (const t of tails) {
      urls.push({ url: fixBase(b.base + t), kind: b.kind });
    }
  }

  // final list fallbacks: ?id=<id>
  const listQueries = [
    {
      url: fixBase(`/api/v1/products/?id=${encodeURIComponent(idStr)}`),
      kind: "product",
      list: true,
    },
    {
      url: fixBase(`/products/?id=${encodeURIComponent(idStr)}`),
      kind: "product",
      list: true,
    },
    {
      url: fixBase(`/api/v1/services/?id=${encodeURIComponent(idStr)}`),
      kind: "service",
      list: true,
    },
    {
      url: fixBase(`/services/?id=${encodeURIComponent(idStr)}`),
      kind: "service",
      list: true,
    },
  ];

  return [...urls, ...listQueries];
};

/* ---------------- component ---------------- */

const ProductDetailsPage = () => {
  const { id } = useParams(); // may be slug or id from the route
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [prod, setProd] = useState(() => mapIn());
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(false);

  // REAL backend object id (usually numeric) + what collection it came from
  const [productId, setProductId] = useState(null);
  const [productKind, setProductKind] = useState("product"); // "product" | "service"

  // Keep main image in sync with loaded images
  useEffect(() => {
    if (prod.images && prod.images.length && !mainImage) {
      setMainImage(prod.images[0]);
    }
  }, [prod.images, mainImage]);

  // Load product using discovery (products/services, plural/singular, slug/id, with/without /api/v1)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const candidates = buildDetailCandidates(id);
        let found = false;

        for (const c of candidates) {
          try {
            const res = await apiClient.get(c.url);
            if (!res?.data) continue;

            // If this was a list query (?id=), pick first match
            const data = c.list
              ? Array.isArray(res.data?.results)
                ? res.data.results[0]
                : Array.isArray(res.data)
                ? res.data[0]
                : res.data
              : res.data;
            if (!data) continue;

            if (!cancelled) {
              const mapped = mapIn(data);
              setProd(mapped);
              setProductKind(c.kind);
              if (mapped.images?.length) setMainImage(mapped.images[0]);

              // capture backend product id (supports id or pk)
              const pid = data?.id ?? data?.pk ?? null;
              if (pid != null) setProductId(pid);

              found = true;
            }
            break;
          } catch {
            // try next candidate
          }
        }

        if (!found && !cancelled) {
          setError("This item was not found.");
        }
      } catch {
        if (!cancelled) setError("Failed to load product.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // ---- Cart helpers (create/reuse user cart, add item) ----
  const CART_KEY = "cart_id";

  const ensureCartId = async () => {
    let cartId = localStorage.getItem(CART_KEY);
    if (cartId) return cartId;

    try {
      // Try create (most backends return 201 and the cart id)
      const res = await authApiClient.post(fixBase(`/api/v1/carts/`));
      cartId = res?.data?.id;
      if (!cartId) throw new Error("Cart could not be created");
      localStorage.setItem(CART_KEY, cartId);
      return cartId;
    } catch (e) {
      // If already exists (400/409), try to fetch existing
      const candidates = [
        fixBase(`/api/v1/carts/mine/`),
        fixBase(`/api/v1/carts/`),
      ];
      for (const url of candidates) {
        try {
          const r = await authApiClient.get(url);
          const data = r?.data;
          const idFromSingle = data?.id;
          const idFromList = Array.isArray(data)
            ? data[0]?.id
            : Array.isArray(data?.results)
            ? data.results[0]?.id
            : null;
          cartId = idFromSingle || idFromList;
          if (cartId) {
            localStorage.setItem(CART_KEY, cartId);
            return cartId;
          }
        } catch {
          // continue
        }
      }
      throw e;
    }
  };

  const addItemToCart = async (cartId, pidLike, qty) => {
    const baseItems = fixBase(`/api/v1/carts/${cartId}/items/`);
    const pid = /^\d+$/.test(String(pidLike)) ? Number(pidLike) : pidLike;
    const quantity = Math.max(1, parseInt(qty, 10) || 1);

    // Try ALL common payload shapes in a pragmatic order.
    const payloads = [
      { service_id: pid, quantity },
      { service: pid, quantity },
      { product_id: pid, quantity },
      { product: pid, quantity },
    ];

    let lastErr = null;
    for (const body of payloads) {
      try {
        await authApiClient.post(baseItems, body);
        return; // success
      } catch (e) {
        const status = e?.response?.status;
        if (status === 401)
          throw Object.assign(new Error("AUTH"), { code: 401 });
        lastErr = e; // keep and try next payload
      }
    }

    // If POST didn’t work, the line may already exist → fetch, find, PATCH qty
    const list = await authApiClient
      .get(baseItems)
      .then((r) =>
        Array.isArray(r?.data)
          ? r.data
          : Array.isArray(r?.data?.results)
          ? r.data.results
          : []
      )
      .catch(() => []);

    const found = list.find((li) => {
      const lp = li?.product?.id ?? li?.product_id;
      const ls = li?.service?.id ?? li?.service_id;
      return ls == pid || lp == pid;
    });

    if (found?.id) {
      await authApiClient.patch(
        fixBase(`/api/v1/carts/${cartId}/items/${found.id}/`),
        { quantity: (Number(found.quantity) || 1) + quantity }
      );
      return;
    }

    // Still failing → surface server error message if any
    throw lastErr || new Error("Unable to add item");
  };

  // ---- Book Service → ensure cart → add item → go /checkout (or /signin) ----
  const handleBook = async () => {
    if (!user) {
      navigate("/signin", { replace: true, state: { from: location } });
      return;
    }
    try {
      setError("");
      setBooking(true);

      const cartId = await ensureCartId();
      const pid = productId ?? id; // prefer backend id, fallback to route param
      await addItemToCart(cartId, pid, quantity);

      navigate("/checkout");
    } catch (e) {
      if (e?.code === 401) {
        navigate("/signin");
        return;
      }
      const serverMsg =
        typeof e?.response?.data === "string"
          ? e.response.data
          : e?.response?.data?.detail ||
            e?.response?.data?.non_field_errors?.[0] ||
            e?.response?.data?.service?.[0] ||
            e?.response?.data?.service_id?.[0] ||
            e?.response?.data?.product_id?.[0] ||
            e?.response?.data?.service_id?.[0] ||
            e?.response?.data?.product?.[0] ||
            e?.message;
      setError(serverMsg || "Could not add to cart. Please try again.");
      // console.error("Add to cart failed:", e?.response?.data || e?.message || e);
    } finally {
      setBooking(false);
    }
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  /* ---------------- UI (design unchanged) ---------------- */

  return (
    <div className="font-sans bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-sm overflow-hidden flex items-center justify-center p-4">
              {loading ? (
                <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />
              ) : (
                <img
                  src={mainImage}
                  alt="Main product"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {(prod.images || []).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square bg-white rounded-xl overflow-hidden p-1 transition ring-2 ${
                    mainImage === img
                      ? "ring-green-500"
                      : "ring-transparent hover:ring-green-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="space-y-6">
            <div>
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                {prod.category}
              </span>
              <h1 className="text-4xl font-bold text-[#083d41] mt-2">
                {prod.name}
              </h1>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={` ${
                        i < Math.floor(prod.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-600">
                  {prod.rating} ({prod.reviews} reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {prod.description}
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-green-500">
                ${prod.salePrice}
              </span>
              {/* show strike-through only if sale < price */}
              {Number(prod.salePrice) < Number(prod.price) && (
                <span className="text-2xl font-medium text-gray-400 line-through">
                  ${prod.price}
                </span>
              )}
            </div>

            {/* Quantity (kept simple, no design change) */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white rounded-xl shadow-sm border px-3 py-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:scale-105 transition"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <span className="mx-3 min-w-[2rem] text-center font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:scale-105 transition"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-5">
              <button
                onClick={handleBook}
                disabled={booking}
                className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={22} />
                <span>{booking ? "Adding…" : "Book Service"}</span>
              </button>

              {!!error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              <div className="flex justify-center items-center gap-2 text-sm text-green-600 font-semibold pt-2">
                <CheckCircle size={16} />
                <span>
                  {prod.inStock ? "In Stock & Ready to Ship" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck size={20} />
                <span className="font-medium">
                  Free shipping on orders over $50
                </span>
              </div>
              {!!(prod.tags || []).length && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-800">Tags:</span>
                  {prod.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* simple loading toast (non-blocking) */}
        {loading && (
          <div className="mt-6 mx-auto w-max bg-white border border-gray-200 shadow-sm rounded-full px-4 py-2 text-sm text-gray-600">
            Loading product…
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
