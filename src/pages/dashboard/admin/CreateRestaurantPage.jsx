import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useUserListStore } from "../../../lib/store/zustandStore";

const CreateRestaurantPage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const { users, fetchUsers } = useUserListStore();

  const [selectedOwner, setSelectedOwner] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const [error, setError] = useState();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      name: name,
      slug: name.toLowerCase().split(" ").join("-"),
      address: address,
      phone_number: phoneNumber,
      is_approved: isApproved,
      owner: selectedOwner,
    };

    console.log(obj);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/create/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(obj),
      }
    );
    if (res.ok) {
      return navigate("/admin/dashboard/restaurant-list/");
    }
    const data = await res.json();

    setError(data);
  };

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="py-5">
        <h2 className="text-3xl">Create Restaurant</h2>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder="Restaurant name"
          />
        </div>

        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Address
          </label>
          <textarea
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300 resize-none"
            placeholder="Restaurant address"
            rows={3}
          />
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Phone number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="py-3 px-6 border border-black w-full rounded outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder="Restaurant phone number"
          />
        </div>
        <div className="form-control flex items-center gap-2">
          <input
            type="checkbox"
            checked={isApproved}
            onChange={(e) => setIsApproved(e.target.checked)}
            className="w-6 h-5"
          />
          <label htmlFor="availability" className="text-md font-semibold">
            Available
          </label>
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Owner
          </label>
          <select
            className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            value={selectedOwner}
            onChange={(e) => setSelectedOwner(e.target.value)}
          >
            <option value="">Select an owner</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p className="py-3 text-rose-500">
            {error.name ||
              error.address ||
              error.phone_number ||
              error.is_approved ||
              error.owner ||
              error.slug}
          </p>
        )}
        <button type="submit" className="default-btn rounded py-3.5 w-full">
          Create Restaurant
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurantPage;
