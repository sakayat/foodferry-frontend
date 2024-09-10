import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardHomePage from "../AdminDashboardHomePage";


const AdminDashboardLayout = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="dashboard">
      <div className="flex flex-col lg:flex-row">
        <AdminDashboardHomePage
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
