import { Edit, Home, Info, List, PlusCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useRestaurantInfo } from "../lib/store/zustandStore";

const Sidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { name: "Dashboard", icon: Home, link: "/restaurant/dashboard/" },
    { name: "Add Food Item", icon: PlusCircle, link: "add-food-item/" },
    { name: "Update Restaurant Info", icon: Info },
    { name: "All Food Items", icon: List, link: "food-items/" },
  ];

  const { ownerInfo } = useRestaurantInfo();

  return (
    <div className="w-96 bg-gray-100 h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">{ownerInfo.name}</h2>
      <ul className="flex flex-col gap-5 text-sm">
        {menuItems.map((item, i) => (
          <li key={i}>
            <Link to={item.link}
              className={`w-full rounded p-3 block ${
                activeItem === item.name
                  ? "bg-[#286140] text-white"
                  : "hover-bg-gray-200"
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              <div className="flex items-center gap-3">
                <item.icon className="space-x-4 w-5 h-5" />
                {item.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
