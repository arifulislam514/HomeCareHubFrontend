import axios from "axios";

const authApiClient = axios.create({
  baseURL: "https://home-care-hub.vercel.app/api/v1",
  // baseURL: "http://127.0.0.1:8000/api/v1",
});

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

// auto redirect on 401 with ?next=
authApiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      sessionStorage.removeItem("cart_id");
      const next = window.location.pathname + window.location.search;
      window.location.href = `/signin?next=${encodeURIComponent(next)}`;
    }
    // Dev helper: log backend validation errors loudly
    if (err?.response?.status === 400) {
      console.error("400 from API:", err.response.data);
    }
    return Promise.reject(err);
  }
);

export default authApiClient;
