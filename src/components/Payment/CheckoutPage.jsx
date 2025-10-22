import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, MapPin, CreditCard, Lock, ArrowRight } from "lucide-react";
import authApiClient from "../../services/auth-api-client"; // 🔐 protected endpoints

// Reusable Input Field Component (unchanged)
const InputField = ({ label, type = "text", placeholder, icon, value, onChange, name }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
      />
    </div>
  </div>
);

/* ---------------- helpers ---------------- */

// Avoid duplicating /api/v1 if baseURL already has it.
const fixBase = (path) => {
  const base = authApiClient?.defaults?.baseURL || "";
  return /\/api\/v1\/?$/i.test(base) ? path.replace(/^\/api\/v1/, "") : path;
};

const prefer = (...vals) => vals.find(v => v !== undefined && v !== null && v !== "") ?? undefined;

const formatPrice = (v) => {
  const num = typeof v === "number" ? v : parseFloat(v || 0);
  return Number.isFinite(num) ? num.toFixed(2) : "0.00";
};

// map from CartItem -> UI item
const mapInCartItem = (ci = {}) => {
  const p = ci.product || {};
  const image =
    prefer(p?.image, p?.thumbnail, p?.cover) ||
    prefer(p?.images?.[0]?.url, p?.images?.[0]) ||
    null;

  const price = prefer(p?.price_with_tax, p?.price, p?.unit_price, p?.amount, 0);

  return {
    id: prefer(p?.id, p?._id, p?.pk),
    name: prefer(p?.name, p?.title, "Item"),
    description: prefer(p?.description, p?.details, ""),
    quantity: prefer(ci?.quantity, 1),
    image,
    price,
  };
};

const getCartId = () => localStorage.getItem("cart_id");

/* ---------------- component ---------------- */

const CheckoutPage = () => {
  const navigate = useNavigate();

  // Shipping/Payment form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    exp: "",
    cvc: "",
    coupon: "",
  });

  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);

  // Load cart by id (created earlier on ProductDetails "Book Service")
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError("");

      const cartId = getCartId();
      if (!cartId) {
        if (!cancelled) {
          setItems([]);
          setError("Your cart is empty or could not be loaded.");
          setLoading(false);
        }
        return;
      }

      try {
        const res = await authApiClient.get(fixBase(`/api/v1/carts/${cartId}/`));
        const list = Array.isArray(res?.data?.items) ? res.data.items : [];
        const normalized = list.map(mapInCartItem).filter(x => x?.id);
        if (!cancelled) {
          setItems(normalized);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setItems([]);
          setError("Your cart is empty or could not be loaded.");
          setLoading(false);
        }
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0),
    [items]
  );
  const shipping = useMemo(() => (items.length ? 5 : 0), [items]); // placeholder until backend returns shipping
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const applyCoupon = async () => {
    // Optional: call your coupon endpoint if implemented, else no-op
    setError("");
    try {
      // Example (adjust to your backend if available):
      // await authApiClient.post(fixBase("/api/v1/orders/apply-coupon/"), { code: form.coupon });
      // You could then refresh the cart totals here.
    } catch {
      // ignore gracefully
    }
  };

  const placeOrder = async () => {
    const cartId = getCartId();
    if (!cartId || !items.length) {
      setError("Your cart is empty.");
      return;
    }

    setPlacing(true);
    setError("");

    try {
      // Your backend: create Order from Cart
      await authApiClient.post(fixBase(`/api/v1/orders/`), { cart_id: cartId });

      // Success → go to user bookings page (you can change destination if you prefer)
      navigate("/dashboard/bookings");
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        setError("Please sign in to place the order.");
        navigate("/signin");
      } else if (status === 403) {
        setError("You don’t have permission to perform this action.");
      } else {
        setError("Failed to place order. Please try again.");
      }
    } finally {
      setPlacing(false);
    }
  };

  // ----- UI (unchanged design) -----
  return (
    <div className="font-sans bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#083d41]">Secure Checkout</h1>
          <p className="text-gray-500 mt-2">You're just a few steps away from your purchase.</p>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-pulse text-gray-500">Loading your cart…</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left/Main Column: Shipping & Payment */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information Card */}
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-[#083d41]">Shipping Information</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Full Name" name="fullName" value={form.fullName} onChange={onChange} placeholder="John Doe" icon={<User size={16} />} />
                  <InputField label="Email Address" type="email" name="email" value={form.email} onChange={onChange} placeholder="john.doe@example.com" icon={<User size={16} />} />
                  <InputField label="Street Address" name="address1" value={form.address1} onChange={onChange} placeholder="123 Main St" icon={<MapPin size={16} />} />
                  <InputField label="Apartment, suite, etc." name="address2" value={form.address2} onChange={onChange} placeholder="Apt #4B" icon={<MapPin size={16} />} />
                  <InputField label="City" name="city" value={form.city} onChange={onChange} placeholder="New York" icon={<MapPin size={16} />} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="State" name="state" value={form.state} onChange={onChange} placeholder="NY" icon={<MapPin size={16} />} />
                    <InputField label="ZIP Code" name="zip" value={form.zip} onChange={onChange} placeholder="10001" icon={<MapPin size={16} />} />
                  </div>
                </div>
              </div>

              {/* Payment Details Card */}
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-[#083d41]">Payment Details</h3>
                </div>
                <div className="p-6 space-y-6">
                  <InputField label="Card Number" name="cardNumber" value={form.cardNumber} onChange={onChange} placeholder="**** **** **** 1234" icon={<CreditCard size={16} />} />
                  <div className="grid grid-cols-2 gap-6">
                    <InputField label="Expiration Date" name="exp" value={form.exp} onChange={onChange} placeholder="MM / YY" icon={<CreditCard size={16} />} />
                    <InputField label="CVC" name="cvc" value={form.cvc} onChange={onChange} placeholder="123" icon={<Lock size={16} />} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm p-6 space-y-6">
              <h3 className="text-lg font-bold text-[#083d41] border-b pb-4">Order Summary</h3>

              {items.length === 0 ? (
                <p className="text-gray-500">No items in your cart.</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg p-1">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                        ) : (
                          <div className="w-full h-full rounded-md bg-gray-200" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ${formatPrice((Number(item.price) || 0) * (Number(item.quantity) || 1))}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">${formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-[#083d41]">
                  <span>Total</span>
                  <span>${formatPrice(total)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="coupon"
                    value={form.coupon}
                    onChange={onChange}
                    placeholder="Discount code"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
                  />
                  <button
                    onClick={applyCoupon}
                    type="button"
                    className="bg-gray-200 text-gray-700 font-semibold px-4 rounded-lg hover:bg-gray-300 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={placing || loading || items.length === 0}
                className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-transform transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/30"
              >
                <span>{placing ? "Placing Order…" : "Place Order"}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
