import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/User/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout flex">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Render nested routes */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
