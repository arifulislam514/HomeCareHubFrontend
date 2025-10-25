import useAuthContext from "../hooks/useAuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const { user, loading } = useAuthContext();
  const location = useLocation();
  if (loading) return <p>Loading...</p>;
  if (!user) {
    const next = location.pathname + location.search;
    return <Navigate to={`/signin?next=${encodeURIComponent(next)}`} replace />;
  }
  return <Outlet />;
}
