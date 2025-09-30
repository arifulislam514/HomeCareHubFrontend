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
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="bookings" element={<MyBookingsPage />} />
        <Route path="Profile" element={<ProfilePage />} />
      </Route>
      <Route path="/admin" element={<AdminDashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="manage-bookings" element={<ManageBookingsPage />} />
        <Route path="users-page" element={<UsersPage />} />
        <Route path="services-page" element={<AdminServicesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
