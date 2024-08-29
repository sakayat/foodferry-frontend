import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AddCategoryPage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate()

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", categoryName);
    formData.append("slug", categoryName.toLowerCase().split(" ").join("-"));
    formData.append("image", categoryImage);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/food-category/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      }
    );
    if(res.ok){
      return navigate("/admin/dashboard/category-list")
    }
    const data = await res.json();
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
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
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
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            onChange={handleImageUpload}
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

export default AddCategoryPage;
