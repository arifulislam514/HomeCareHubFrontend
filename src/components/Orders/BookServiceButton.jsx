import React from "react";
import useOneClickBooking from "./useOneClickBooking";

export default function BookServiceButton({
  productId,
  quantity = 1,
  label = "Book Service",
}) {
  const { bookNow } = useOneClickBooking();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onClick = async () => {
    try {
      setError(null);
      setLoading(true);
      await bookNow(productId, quantity); // will redirect to /checkout
    } catch (e) {
      const msg =
        e?.response?.data?.error ||
        e?.response?.data?.detail ||
        e?.message ||
        "Something went wrong";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={onClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-transform transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/30"
      >
        <ShoppingCart size={22} />
        {loading ? "Processing..." : label}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
