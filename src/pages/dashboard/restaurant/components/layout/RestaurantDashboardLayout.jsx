import React, { useState } from "react";
import Sidebar from "../../../../../components/Sidebar";
import { Outlet } from "react-router-dom";

const RestaurantDashboardLayout = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  
  return (
    <div className="dashboard">
      <div className="grid grid-cols-1 gap-5 lg:flex lg:gap-0 ">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RestaurantDashboardLayout;
