import React, { useEffect, useMemo, useState } from "react";
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle,
  Truck,
} from "lucide-react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/api-client"; // public axios instance
import OneClickBooking from "../../services/OneClickBooking";

/* ---------------- helpers: mapping + formatting ---------------- */

const fixBase = (path) => {
  // If your apiClient baseURL already ends with /api/v1, avoid duplicating it.
  const base = apiClient?.defaults?.baseURL || "";
  return /\/api\/v1\/?$/i.test(base) ? path.replace("/api/v1", "") : path;
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
    // fallback placeholders to preserve your gallery layout
    images = [
      "https://placehold.co/600x600/083d41/ffffff?text=Main",
      "https://placehold.co/600x600/22c55e/ffffff?text=Side",
      "https://placehold.co/600x600/eab308/ffffff?text=In+Use",
      "https://placehold.co/600x600/f97316/ffffff?text=Kit",
    ];
  }

  // rating / reviews (fallbacks if your API doesn't provide these)
  const rating = Number(p.rating ?? p.stars ?? 4.5);
  const reviews = Number(p.reviews_count ?? p.reviews ?? 128);

  // stock
  const inStock = p.in_stock ?? p.available ?? p.stock > 0 ?? true; // default true so your green "In Stock" shows

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

/* ---------------- component ---------------- */

const ProductDetailsPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const { bookNow } = OneClickBooking();

  const [loading, setLoading] = useState(true);
  const [prod, setProd] = useState(
    () => mapIn() // seed with fallbacks so layout is stable before load
  );
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [booking, setBooking] = useState(false);
  const [bookError, setBookError] = useState(null);

  // Keep main image in sync with loaded images
  useEffect(() => {
    if (prod.images && prod.images.length && !mainImage) {
      setMainImage(prod.images[0]);
    }
  }, [prod.images, mainImage]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        // Try products/:id first, then services/:id
        const candidates = [
          fixBase(`/api/v1/products/${id}/`),
          fixBase(`/products/${id}/`),
        ];

        for (const url of candidates) {
          try {
            const res = await apiClient.get(url);
            if (!cancelled && res?.data) {
              const mapped = mapIn(res.data);
              setProd(mapped);
              if (mapped.images?.length) setMainImage(mapped.images[0]);
              break;
            }
            // if no data, try next
          } catch {
            // try next
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleBook = async () => {
    try {
      setBookError(null);
      setBooking(true);
      await bookNow(productId, quantity);
    } catch (e) {
      const msg =
        e?.response?.data?.error ||
        e?.response?.data?.detail ||
        e?.message ||
        "Something went wrong";
      setBookError(msg);
      setBooking(false);
    }
  };

  return (
    <div className="font-sans bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* simple loading toast (non-blocking) */}
        {loading && (
          <div className="mt-6 mx-auto w-max bg-white border border-gray-200 shadow-sm rounded-full px-4 py-2 text-sm text-gray-600">
            Loading product…
          </div>
        )}
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

            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-5">
              <button
                onClick={handleBook}
                disabled={booking}
                className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-transform transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/30"
              >
                <ShoppingCart size={22} />
                <span>{booking ? "Processing..." : "Book Service"}</span>
              </button>

              {bookError && (
                <p className="text-red-600 text-sm text-center">{bookError}</p>
              )}

              {/* <div className="flex justify-center items-center gap-2 text-sm text-green-600 font-semibold pt-2">
                <CheckCircle size={16} />
                <span>
                  {prod.inStock ? "In Stock & Ready to Ship" : "Out of Stock"}
                </span>
              </div> */}
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
      </div>
    </div>
  );
};

export default ProductDetailsPage;
