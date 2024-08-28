import React, { useState } from "react";
import { useFoodCategories, useFoodTags } from "../lib/store/zustandStore";
import { useNavigate } from "react-router-dom";

const AddFoodItemPage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const [error, setError] = useState("");

  const { foodCategories } = useFoodCategories();

  const { foodTags } = useFoodTags();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFoodImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", foodName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", foodImage);
    formData.append("category", category);
    formData.get("tags", tags);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/add-food-item/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      }
    );

    if (res.ok) {
      return navigate("/restaurant/dashboard/food-items/");
    }

    const data = await res.json();

    setError(data);
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-5">
      <div className="py-5">
        <h2 className="text-3xl">Add Food Item</h2>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Name
          </label>
          <input
            type="text"
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder="food name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Description
          </label>
          <textarea
            type="text"
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300 resize-none"
            placeholder="food description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Price
          </label>
          <input
            type="text"
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder="food price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder="food price"
            onChange={handleImageUpload}
          />
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Food Categories
          </label>
          <select
            className="w-full outline-none border border-black/20 py-3 px-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {foodCategories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Food Tags
          </label>
          <select
            className="w-full outline-none border border-black/20 py-3 px-4"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          >
            <option value="">Select Tags</option>
            {foodTags.map((tag, i) => (
              <option value={tag.id} key={i}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p className="py-3 text-rose-500">
            {error.name ||
              error.description ||
              error.price ||
              error.category ||
              error.tags}
          </p>
        )}
        <button type="submit" className="default-btn py-3.5 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFoodItemPage;
