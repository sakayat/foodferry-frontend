import React, { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";

const UpdateUserRolePage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate()

  const { id } = useParams();

  const userRoles = [
    { value: "customer", label: "Customer" },
    { value: "restaurant_owner", label: "Restaurant Owner" },
    { value: "admin", label: "Admin" },
  ];

  const [role, setRole] = useState("");

  const [user, setUser] = useState({});

  const [error, setError] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (id) {
      setRole(user.role || "");
    }
  }, [user]);

  const fetchUser = async (e) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/update-user/${id}/role/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    
    setUser(data);
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/update-user/${id}/role/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ role }),
      }
    );
    const data = await res.json();
    setError(data);

    if(res.ok){
        return navigate("/admin/dashboard/users/")
    }

  };

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="py-5">
        <h2 className="text-3xl">Update User Role</h2>
      </div>
      <form className="space-y-5" onSubmit={handleUpdateRole}>
        <div className="form-control space-y-2">
          <label className="text-md font-semibold">User Name</label>
          <input
            type="text"
            className="py-3 px-6 border border-gray-300 rounded w-full  outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder={user.username}
            disabled
          />
        </div>
        <div className="form-control space-y-2">
          <label className="text-md font-semibold">Email</label>
          <input
            type="text"
            className="py-3 px-6 border border-gray-300 rounded w-full  outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder={user.email}
            disabled
          />
        </div>
        <div className="form-control space-y-2">
          <label className="text-md font-semibold">Phone Number</label>
          <input
            type="text"
            className="py-3 px-6 border border-gray-300 rounded w-full  outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder={user.phone_number}
            disabled
          />
        </div>
        <div className="form-control space-y-2">
          <label className="text-md font-semibold">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="py-3 px-6 border border-black rounded w-full outline-none focus:border-gray-300"
          >
            {userRoles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="py-3 text-rose-500">{error.error}</p>}
        <button className="default-btn rounded py-3.5 w-full">Submit</button>
      </form>
    </div>
  );
};

export default UpdateUserRolePage;
