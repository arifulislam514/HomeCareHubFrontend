// src/services/auth-api-client.js
import axios from "axios";

const authApiClient = axios.create({
  // baseURL: "https://home-care-hub.vercel.app/api/v1",
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    Accept: "application/json",               // prefer JSON
    "X-Requested-With": "XMLHttpRequest",     // hint to server that it's AJAX
  },
});

// Attach JWT like you already do
authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      config.headers.Authorization = `JWT ${JSON.parse(token)?.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- UTIL: derive a short, friendly message from ANY error shape
function deriveFriendlyMessage(error) {
  // 1) Network / CORS
  if (!error?.response) return "Network error — please check your connection.";

  const { data, status, headers } = error.response || {};
  const ctype = (headers?.["content-type"] || "").toLowerCase();

  // 2) HTML error page (e.g., Django debug page)
  if (typeof data === "string") {
    const snippet = data.trim().slice(0, 200).toLowerCase();
    if (snippet.startsWith("<!doctype") || snippet.startsWith("<html")) {
      if (status >= 500) return "Server error — please try again.";
      if (status === 404) return "Not found.";
      if (status === 400) return "Bad request.";
      return "Something went wrong.";
    }
    // Plain text string
    return data.slice(0, 300);
  }

  // 3) JSON payloads (common keys)
  if (data && typeof data === "object") {
    const first =
      data.error ||
      data.detail ||
      data.message ||
      data.msg ||
      (Array.isArray(data.non_field_errors) && data.non_field_errors[0]);

    if (first) return String(first);

    // Field errors: {field: ["err1", ...]}
    const fieldKey = Object.keys(data)[0];
    if (fieldKey && Array.isArray(data[fieldKey]) && data[fieldKey][0]) {
      return String(data[fieldKey][0]);
    }
  }

  // 4) Fallbacks
  if (status >= 500) return "Server error — please try again.";
  if (status === 429) return "Too many requests — please try later.";
  if (status === 404) return "Not found.";
  if (status === 401) return "Please sign in to continue.";
  if (status === 400) return "Invalid request.";
  return "Something went wrong.";
}

// ---- RESPONSE INTERCEPTOR: keep your 401 redirect + attach friendlyMessage
authApiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const friendlyMessage = deriveFriendlyMessage(err);

    // Preserve your existing behavior:
    if (err?.response?.status === 401) {
      sessionStorage.removeItem("cart_id");
      const next = window.location.pathname + window.location.search;
      // Return a never-resolving promise to avoid "Unhandled promise rejection"
      // while we navigate away.
      window.location.href = `/signin?next=${encodeURIComponent(next)}`;
      return new Promise(() => {}); // stop the chain
    }

    // Dev helper: log backend validation errors loudly (still useful)
    if (err?.response?.status === 400) {
      // eslint-disable-next-line no-console
      console.error("400 from API:", err.response.data);
    }

    // Reject with a wrapped error including a clean message
    const wrapped = {
      ...err,
      friendlyMessage,
      status: err?.response?.status,
      data: err?.response?.data,
    };
    return Promise.reject(wrapped);
  }
);

export default authApiClient;
