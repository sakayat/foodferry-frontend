import { Home, List, Pen, PlusCircle, User2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboardSidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { name: "Home", icon: Home, link: "/admin/dashboard/" },
    { name: "All User", icon: User2, link: "users/" },
    { name: "Add Food Category", icon: PlusCircle, link: "food-category/" },
    { name: "Add Food Tag", icon: PlusCircle, link: "food-tag/" },
    { name: "Create Restaurant", icon: Pen, link: "create-restaurant/" },
    { name: "Restaurant List", icon: List, link: "restaurant-list/" },
    { name: "Category List", icon: List, link: "category-list/" },
    { name: "Tag List", icon: List, link: "tag-list/" },
  ];

  return (
    <div className="bg-gray-100 lg:h-screen p-4 w-full lg:w-96">
      <ul className="flex flex-col gap-5 text-sm">
        {menuItems.map((item, i) => (
          <li key={i}>
            <Link
              to={item.link}
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

export default AdminDashboardSidebar;
