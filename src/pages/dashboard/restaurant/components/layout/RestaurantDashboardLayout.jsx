import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import RestaurantDashboardSidebar from "../RestaurantDashboardSidebar";
import DashboardNavbar from "../DashboardNavbar";
import { useRenderProfileInfoStore } from "../../../../../lib/store/zustandStore";

const RestaurantDashboardLayout = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const { user, fetchProfileInfo } = useRenderProfileInfoStore();

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  return (
    <div className="dashboard">
      <div className="grid grid-cols-1 gap-5 lg:flex lg:h-screen lg:gap-0">
        <div className="lg:hidden block">
          <DashboardNavbar user={user} />
        </div>
        <RestaurantDashboardSidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <main className="flex-1 w-full flex flex-col">
          <div className="hidden lg:block">
            <DashboardNavbar user={user} />
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RestaurantDashboardLayout;
