import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";

const AddFoodTagPage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [tagName, setTagName] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      name: tagName,
      slug: tagName.toLowerCase().split(" ").join("-"),
    };

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/food-tags/`,
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
      return navigate("/admin/dashboard/tag-list");
    }
    const data = await res.json();

    setError(data);
  };

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="py-5">
        <h2 className="text-3xl">Add Food Tag</h2>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Tag Name
          </label>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder="Category name"
          />
        </div>
        {error && (
          <p className="py-3 text-rose-500">{error.name || error.slug}</p>
        )}
        <button type="submit" className="default-btn py-3.5 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFoodTagPage;