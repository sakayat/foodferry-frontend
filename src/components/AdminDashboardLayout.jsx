import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardSidebar from "./AdminDashboardSidebar";

const AdminDashboardLayout = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="dashboard">
      <div className="flex">
        <AdminDashboardSidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
