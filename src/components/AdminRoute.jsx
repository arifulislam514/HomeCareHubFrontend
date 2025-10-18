// src/components/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const isAdminUser = (u) =>
  !!(u?.is_staff ||
     u?.is_superuser ||
     u?.is_admin ||
     u?.role === "Admin" ||
     u?.groups?.includes?.("Admin") ||
     u?.groups?.some?.(g => (g.name || g) === "Admin"));

export default function AdminRoute() {
  const { user, loading } = useAuthContext();
  if (loading) return <p>Loading...</p>;
  return isAdminUser(user) ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
