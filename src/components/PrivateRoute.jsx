import useAuthContext from "../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { user, loading } = useAuthContext();
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/signin" replace />;
  return <Outlet />;
}
