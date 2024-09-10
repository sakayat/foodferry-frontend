import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OurMenuSkeleton from "../components/OurMenuSkeleton";

const OurMenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [activeTab, setActiveTab] = useState("Pizza");
  const [foodItem, setFoodItem] = useState([]);

  useEffect(() => {
    fetchSelectedMenu();
    if (activeTab === "Pizza") {
      fetchMenuItem();
    }
  }, []);

  const fetchSelectedMenu = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/food-categories/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    const menuData = data.filter(
      (item) =>
        item.name === "Pizza" ||
        item.name === "Pasta" ||
        item.name === "Burgers" ||
        item.name === "Drinks" ||
        item.name === "Desserts"
    );
    setMenu(menuData);
  };

  const handleMenuItem = (item) => {
    setActiveTab(item.name);
    fetchMenuItem(item.slug);
  };

  const fetchMenuItem = async (slug) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/category-food-list/${
        slug ? slug : "pizza"
      }/`
    );
    const data = await res.json();
    setFoodItem(data.results);
  };

  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <div className="py-5">
          <h1 className="text-center text-3xl">Discover Our Menu</h1>
        </div>
        {menu.length === 0 && <OurMenuSkeleton />}
        <div className="space-y-8">
          <div className="flex border-b border-gray-200">
            {menu.map((item) => (
              <button
                key={item.id}
                className={`py-3 px-4 text-md font-medium leading-5 ${
                  activeTab === item.name
                    ? "text-black border-b-2 border-[#286140]"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => handleMenuItem(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {foodItem.map((item) => (
              <div
                key={item.id}
                className={`${activeTab != item.id ? "block" : "hidden"} `}
              >
                <div className="space-y-2">
                  <Link
                    to={`/food/${item.slug}/`}
                    className="block bg-white shadow-lg"
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-gray-800 to-transparent opacity-75 rounded-xl">
                        <div className="w-full p-4">
                          <h3 className="text-lg font-semibold mb-1 text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-300 ">{item.price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMenuPage;
