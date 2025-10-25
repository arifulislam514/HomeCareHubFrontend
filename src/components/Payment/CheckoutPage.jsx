import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, MapPin, ArrowRight, Edit3, Check } from "lucide-react";
import authApiClient from "../../services/auth-api-client";

// Reusable Input Field
const InputField = ({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
      />
    </div>
  </div>
);

const money = (n) => Number(n || 0).toFixed(2);

export default function CheckoutPage() {
  const navigate = useNavigate();

  // UI state
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  // Cart data
  const [cartId, setCartId] = useState(
    () => sessionStorage.getItem("cart_id") || ""
  );
  const [items, setItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Shipping/coupon demo
  const [coupon, setCoupon] = useState("");
  const [shipping, setShipping] = useState(5.0);

  // --- Shipping form values (dynamic) ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  // display mode for shipping: summary vs edit form
  const [editingShipping, setEditingShipping] = useState(false);

  // Helper: determine if user already has “enough” shipping info to show summary
  const hasSavedShipping = useMemo(() => {
    return Boolean(
      fullName && email && street && city && (stateCode || zip || phone) // minimal set
    );
  }, [fullName, email, street, city, stateCode, zip, phone]);

  // ---- Load user profile (for shipping) + cart ----
  useEffect(() => {
    let cancelled = false;

    const fetchMe = async () => {
      try {
        // Adjust if your endpoint differs; many projects expose /auth/users/me/
        const { data } = await authApiClient.get("/auth/users/me/");
        if (cancelled) return;

        const name = [data?.first_name, data?.last_name]
          .filter(Boolean)
          .join(" ")
          .trim();
        setFullName((v) => v || name);
        setEmail((v) => v || data?.email || "");
        setPhone((v) => v || data?.phone_number || "");
        setStreet((v) => v || data?.address || ""); // your backend used 'address' in payment
        setCity((v) => v || data?.city || "");
        setStateCode((v) => v || data?.state || "");
        setZip((v) => v || data?.zip || "");
        // apt stays optional
      } catch {
        // no-op; user fields may be empty or endpoint differs
      }
    };

    const fetchCartId = async () => {
      try {
        const { data } = await authApiClient.post("/carts/", {});
        sessionStorage.setItem("cart_id", data.id);
        return data.id;
      } catch {
        const { data } = await authApiClient.get("/carts/me/");
        sessionStorage.setItem("cart_id", data.id);
        return data.id;
      }
    };

    const ensureCartId = async () => {
      const cached = sessionStorage.getItem("cart_id");
      if (!cached) return fetchCartId();
      try {
        await authApiClient.get(`/carts/${cached}/`);
        return cached;
      } catch {
        return fetchCartId();
      }
    };

    const load = async () => {
      setError(null);
      setLoading(true);
      try {
        await fetchMe(); // prefill shipping if available

        const id = await ensureCartId();
        if (cancelled) return;
        setCartId(id);

        const { data } = await authApiClient.get(`/carts/${id}/`);
        if (cancelled) return;

        setItems(Array.isArray(data.items) ? data.items : []);
        setCartTotal(Number(data.total_price || 0));
        // If user has saved shipping, start in summary mode
        setEditingShipping(!hasSavedShipping);
      } catch (e) {
        if (cancelled) return;
        const msg =
          e?.response?.data?.detail ||
          e?.response?.data?.error ||
          e?.message ||
          "Failed to load checkout";
        setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // Derived totals
  const subtotal = useMemo(() => {
    if (items.length) {
      return items.reduce(
        (acc, it) =>
          acc +
          Number(
            it.total_price ?? (it.product?.price || 0) * (it.quantity || 0)
          ),
        0
      );
    }
    return 0;
  }, [items]);

  const total = useMemo(() => {
    const base = cartTotal > 0 ? cartTotal : subtotal;
    return base + Number(shipping || 0);
  }, [cartTotal, subtotal, shipping]);

  const applyCoupon = () => {
    if (!coupon.trim()) return;
    if (coupon.trim().toUpperCase() === "SAVE5") {
      setShipping(Math.max(0, (shipping || 0) - 5));
    }
  };

  // Place order → POST /orders/ { cart_id }
  const placeOrder = async () => {
    setPlacing(true);
    setError(null);

    try {
      if (!cartId) throw new Error("No cart available");

      // 1) Create the order
      const { data: order } = await authApiClient.post("/orders/", {
        cart_id: cartId,
      });
      // order: { id, total_price, items: [...] }

      // 2) Prepare payment payload (what your backend expects)
      const amount = Number(order?.total_price || 0);
      const numItems = Array.isArray(order?.items) ? order.items.length : 0;
      const orderId = order?.id;

      if (!orderId || !amount) {
        throw new Error("Order created but missing amount or order ID");
      }

      // 3) Initiate payment (adjust the path if your backend differs)
      const { data: pay } = await authApiClient.post("/payment/initiate/", {
        amount,
        orderId,
        numItems,
      });

      // 4) Redirect to gateway
      if (pay?.payment_url) {
        try {
          sessionStorage.removeItem("cart_id");
        } catch {}
        window.location.href = pay.payment_url; // go to SSLCommerz hosted page
        return;
      }

      throw new Error("Payment initiation failed — no payment_url returned");
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        e?.response?.data?.error ||
        e?.message ||
        "Failed to place order";
      setError(msg);
      setPlacing(false);
    }
  };

  // UI states
  if (loading) {
    return (
      <div className="font-sans bg-gray-50 min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse h-8 w-64 bg-gray-200 rounded mb-6" />
          <div className="animate-pulse h-56 bg-white rounded-2xl shadow-sm" />
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="font-sans bg-gray-50 min-h-screen p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[#083d41]">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mt-2">
            Add a service or product to proceed to checkout.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#083d41]">Secure Checkout</h1>
          <p className="text-gray-500 mt-2">
            You're just a few steps away from your purchase.
          </p>
          {error && <p className="text-red-600 mt-3">{error}</p>}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Left/Main Column: Shipping */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#083d41]">
                  Shipping Information
                </h3>
                {hasSavedShipping && (
                  <button
                    onClick={() => setEditingShipping((s) => !s)}
                    className="flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
                  >
                    {editingShipping ? (
                      <>
                        <Check size={16} /> Save
                      </>
                    ) : (
                      <>
                        <Edit3 size={16} /> Edit
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* If user has saved info and not editing → summary view */}
              {hasSavedShipping && !editingShipping ? (
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <p className="font-semibold">{fullName}</p>
                    <p className="text-sm">{email}</p>
                    {phone && <p className="text-sm">{phone}</p>}
                  </div>
                  <div>
                    <p className="font-semibold">Shipping Address</p>
                    <p className="text-sm">
                      {street}
                      {apt ? `, ${apt}` : ""}
                      <br />
                      {city}
                      {stateCode ? `, ${stateCode}` : ""} {zip || ""}
                    </p>
                  </div>
                </div>
              ) : (
                // Otherwise → editable form
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    placeholder="John Doe"
                    icon={<User size={16} />}
                    value={fullName}
                    onChange={setFullName}
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="john.doe@example.com"
                    icon={<User size={16} />}
                    value={email}
                    onChange={setEmail}
                  />
                  <InputField
                    label="Phone"
                    type="tel"
                    placeholder="+8801xxxxxxxxx"
                    icon={<User size={16} />}
                    value={phone}
                    onChange={setPhone}
                  />
                  <InputField
                    label="Street Address"
                    placeholder="123 Main St"
                    icon={<MapPin size={16} />}
                    value={street}
                    onChange={setStreet}
                  />
                  <InputField
                    label="Apartment, suite, etc."
                    placeholder="Apt #4B"
                    icon={<MapPin size={16} />}
                    value={apt}
                    onChange={setApt}
                  />
                  <InputField
                    label="City"
                    placeholder="Dhaka"
                    icon={<MapPin size={16} />}
                    value={city}
                    onChange={setCity}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="State"
                      placeholder="BD"
                      icon={<MapPin size={16} />}
                      value={stateCode}
                      onChange={setStateCode}
                    />
                    <InputField
                      label="ZIP Code"
                      placeholder="1212"
                      icon={<MapPin size={16} />}
                      value={zip}
                      onChange={setZip}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-bold text-[#083d41] border-b pb-4">
              Order Summary
            </h3>

            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg p-1">
                    <img
                      src={`https://placehold.co/100x100/083d41/ffffff?text=${encodeURIComponent(
                        it.product?.name?.[0] || "P"
                      )}`}
                      alt={it.product?.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800">
                      {it.product?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {it.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    $
                    {money(
                      it.total_price ??
                        (it.product?.price || 0) * (it.quantity || 0)
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium">${money(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-[#083d41]">
                <span>Total</span>
                <span>${money(total)}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-gray-200 text-gray-700 font-semibold px-4 rounded-lg hover:bg-gray-300 transition"
                >
                  Apply
                </button>
              </div>
            </div>

            <button
              disabled={placing}
              onClick={placeOrder}
              className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-transform transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/30 disabled:opacity-60"
            >
              <span>{placing ? "Redirecting to payment…" : "Place Order"}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
