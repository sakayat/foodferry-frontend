import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurantInfo } from "../../../../lib/store/zustandStore";

const FoodItemForm = ({ categories, foodTags, id }) => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [category, setCategory] = useState("");
  const [foodTag, setFoodTag] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const [error, setError] = useState("");

  const [foodItem, setFoodItem] = useState({});

  useEffect(() => {
    if (id) {
      fetchFoodItem();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setFoodName(foodItem.name || "");
      setDescription(foodItem.description || "");
      setPrice(foodItem.price || "");
      setCategory(foodItem.category || "");
      setFoodTag(foodItem.tags || "");
      setIsAvailable(foodItem.is_available || "");
    }
  }, [foodItem]);

  const fetchFoodItem = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/update-food/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();

    setFoodItem(data);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFoodImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", foodName);
    formData.append("slug", foodName.toLowerCase().split(" ").join("-"));
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", foodImage);
    formData.append("category", category);
    formData.append("tags", foodTag);
    formData.append("is_available", isAvailable);

    if (id) {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/restaurant/update-food/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      if (res.ok) {
        return navigate("/restaurant/dashboard/food-items/");
      }
      setError(data);
    } else {
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
    }
  };

  return (
    <div>
      <div className="py-5">
        <h2 className="text-3xl">
          {id ? "Update Food Item" : "Add Food Item"}
        </h2>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Name
          </label>
          <input
            type="text"
            className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
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
            onChange={handleImageUpload}
          />
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Food Category
          </label>
          <select
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories?.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="category" className="text-md font-semibold">
            Food Tag
          </label>
          <select
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            value={foodTag}
            onChange={(e) => setFoodTag(e.target.value)}
          >
            <option value="">Select Tag</option>
            {foodTags?.map((tag) => (
              <option value={tag.id} key={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control flex items-center gap-2">
          <input
            type="checkbox"
            className="w-6 h-5"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          <label htmlFor="availability" className="text-md font-semibold">
            Available
          </label>
        </div>
        {error && (
          <p className="py-3 text-rose-500">
            {error.name ||
              error.description ||
              error.price ||
              error.category ||
              error.tags ||
              error.slug}
          </p>
        )}
        <button type="submit" className="default-btn rounded py-3.5 w-full">
          {id ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FoodItemForm;
