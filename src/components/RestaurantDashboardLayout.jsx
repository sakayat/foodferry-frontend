import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const RestaurantDashboardLayout = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  
  return (
    <div className="dashboard">
      <div className="flex">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RestaurantDashboardLayout;
