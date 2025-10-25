import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentResult({ status }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Optional: verify with backend if you expose a verify endpoint
    // For now, just read whatever the gateway returned in query params
    const txn = params.get("tran_id") || params.get("transaction_id");
    setMessage(txn ? `Transaction: ${txn}` : "");
  }, [params]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">
        {status === "success" ? "Payment Successful 🎉" :
         status === "failed" ? "Payment Failed" :
         "Payment Cancelled"}
      </h1>
      {message && <p className="text-gray-600 mb-4">{message}</p>}
      <button
        className="px-4 py-2 rounded bg-black text-white"
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </button>
    </div>
  );
}
