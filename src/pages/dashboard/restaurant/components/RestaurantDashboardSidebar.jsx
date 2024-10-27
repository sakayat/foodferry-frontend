import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Info, List, ListOrdered, PlusCircle } from "lucide-react";
import { useRestaurantInfo } from "../../../../lib/store/zustandStore";

const RestaurantDashboardSidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    {
      name: "Home",
      icon: <Home className="w-5 h-5 mr-3" />,
      link: "/restaurant/dashboard/",
    },
    {
      name: "Add Food Item",
      icon: <PlusCircle className="w-5 h-5 mr-3" />,
      link: "/restaurant/dashboard/add-food-item/",
    },
    {
      name: "Update Restaurant Info",
      icon: <Info className="w-5 h-5 mr-3" />,
      link: "/restaurant/dashboard/update-restaurant-info/",
    },
    {
      name: "All Food Items",
      icon: <List className="w-5 h-5 mr-3" />,
      link: "/restaurant/dashboard/food-items/",
    },
    {
      name: "Order Food",
      icon: <ListOrdered className="w-5 h-5 mr-3" />,
      link: "/restaurant/dashboard/user-order/",
    },
  ];

  const { ownerInfo, fetchRestaurantInfo } = useRestaurantInfo();

  useEffect(() => {
    fetchRestaurantInfo();
  }, []);

  return (
    <div className="h-full lg:w-[350px] bg-gray-50 px-4">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-xl font-bold text-gray-800 uppercase">
          {ownerInfo.name}
        </span>
      </div>
      <nav className="mt-5">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`flex items-center rounded p-3 mb-2 transition duration-200 ${
              activeItem === item.name
                ? "bg-[#286140] text-white shadow-md"
                : "hover:bg-gray-100"
            } ${ownerInfo.error ? "pointer-events-none opacity-60" : ""}`}
            onClick={() => setActiveItem(item.name)}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default RestaurantDashboardSidebar;
