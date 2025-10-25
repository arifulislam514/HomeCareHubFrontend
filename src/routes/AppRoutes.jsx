import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Services from "../pages/Services";
import ContactUs from "../pages/ContactUs";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import DashboardLayout from "../layouts/UserDashboardLayout";
import UserDashboard from "../components/Dashboard/User/UserDashboard";
import MyBookingsPage from "../components/Dashboard/User/MyBookingsPage";
import ProfilePage from "../components/Dashboard/User/ProfilePage";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AdminDashboard from "../components/Dashboard/Admin/AdminDashboard";
import ManageBookingsPage from "../components/Dashboard/Admin/ManageBookingsPage";
import UsersPage from "../components/Dashboard/Admin/UsersPage";
import AdminServicesPage from "../components/Dashboard/Admin/AdminServicesPage";
import AdminRoute from "../components/AdminRoute";
import PrivateRoute from "../components/PrivateRoute";
import ProductEditPage from "../components/Products/ProductEditPage";
import ProductDetailsPage from "../components/ProductDetails/ProductDetailsPage";
import CheckoutPage from "../components/Payment/CheckoutPage";
import PaymentResult from "../components/Payment/PaymentResult";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes  */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="service" element={<Services />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        {/* Protected route for checkout */}
        <Route element={<PrivateRoute />}>
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="payment/success" element={<PaymentResult status="success" />} />
          <Route path="payment/fail" element={<PaymentResult status="failed" />} />
          <Route path="payment/cancel" element={<PaymentResult status="cancel" />} />
        </Route>
      </Route>

      {/* User dashboard (must be logged in) */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="bookings" element={<MyBookingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Admin dashboard (must be admin) */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="manage-bookings" element={<ManageBookingsPage />} />
          <Route path="users-page" element={<UsersPage />} />
          <Route path="services-page" element={<AdminServicesPage />} />
          <Route path="products/:id/edit" element={<ProductEditPage />} />
          <Route path="products/new" element={<ProductEditPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
