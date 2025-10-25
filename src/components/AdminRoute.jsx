// src/components/AdminRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const isAdminUser = (u) =>
  !!(
    u &&
    (u.is_staff ||
      u.is_superuser ||
      u.is_admin ||
      u.role === "Admin" ||
      u?.groups?.includes?.("Admin") ||
      u?.groups?.some?.((g) => (g?.name || g) === "Admin"))
  );

export default function AdminRoute() {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  // Not logged in → go sign in and preserve where they tried to go
  if (!user) {
    const next = location.pathname + location.search;
    return <Navigate to={`/signin?next=${encodeURIComponent(next)}`} replace />;
  }

  // Logged in but not admin → send to dashboard (or your 403 page)
  if (!isAdminUser(user)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin → allow access
  return <Outlet />;
}
