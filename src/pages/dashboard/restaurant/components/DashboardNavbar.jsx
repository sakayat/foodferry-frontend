import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, User2Icon } from "lucide-react";

const DashboardNavbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const data = localStorage.getItem("user");
  const parseData = data ? JSON.parse(data) : {};
  const token = parseData.token;
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/accounts/logout/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify("user"));
      navigate("/sign-in");
    }
  };

  return (
    <header className="bg-white border-b px-4 py-2 flex justify-end">
      <div className="relative">
        <button
          className="border w-12 h-12 rounded-full flex justify-center items-center"
          onClick={toggleDropdown}
        >
          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <User2Icon className="h-6 w-6" />
          )}
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
            <div className="p-2">
              <p className="font-medium">{user.username}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              <User className="inline-block mr-2" />
              Profile
            </Link>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleLogout()}
            >
              <LogOut className="inline-block mr-2" />
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;
