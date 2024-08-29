import React, { useEffect } from "react";
import { Users, FolderTree, Tag, Store } from "lucide-react";
import {
  useUsersStore,
  useRestaurantListStore,
  useFoodCategoriesStore,
  useFoodTagStore,
} from "../lib/store/zustandStore";

const AdminDashboardHome = () => {
  useEffect(() => {
    fetchUsers();
    fetchRestaurants();
    fetchCategories();
    fetchTags();
  }, []);

  const { users, fetchUsers } = useUsersStore();
  const { categories, fetchCategories } = useFoodCategoriesStore();
  const { tags, fetchTags } = useFoodTagStore();
  const { restaurants, fetchRestaurants } = useRestaurantListStore();

  const data = [
    {
      title: "Total users",
      value: users.length,
      icon: <Users size={30}/>
    },
    {
      title: "Total Categories",
      value: categories.length,
      icon: <FolderTree size={30}/>
    },
    {
      title: "Total Tags",
      value: tags.length,
      icon: <Tag size={30}/>
    },
    {
      title: "Total Restaurants",
      value: restaurants.length,
      icon: <Store size={30}/>
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="py-5">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {data.map((item, i) => (
          <div
            className="flex flex-col items-center gap-2 py-3 px-6 border border-gray-300"
            key={i}
          >
            <span>{item.icon}</span>
            <div className="text-xl font-medium">{item.title}</div>
            <div className="text-4xl font-bold">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
