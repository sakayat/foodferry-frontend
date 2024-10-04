import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategoryPage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "hxdbn2v3");
    data.append("cloud_name", "dmbu1haaj");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dmbu1haaj/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const imageUrl = await res.json();
    setCategoryImage(imageUrl.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/food-category/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          name: categoryName,
          slug: categoryName.toLowerCase().split(" ").join("-"),
          image: categoryImage,
        }),
      }
    );
    if (res.ok) {
      return navigate("/admin/dashboard/category-list");
    }
    const data = await res.json();

    console.log(data);

    setError(data);
  };

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="py-5">
        <h2 className="text-3xl">Add Food Category</h2>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="py-3 px-6 border rounded border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder="Category name"
          />
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Category Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="py-2.5 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            onChange={handleImageUpload}
          />
        </div>
        {error && (
          <p className="py-3 text-rose-500">{error.name || error.slug}</p>
        )}
        <button type="submit" className="default-btn rounded py-3.5 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCategoryPage;
