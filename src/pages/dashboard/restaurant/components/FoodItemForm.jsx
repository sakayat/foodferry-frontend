import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const FoodItemForm = ({ categories, foodTags, id }) => {
  const data = localStorage.getItem("user");
  const parseData = data ? JSON.parse(data) : {};
  const token = parseData.token;
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setSubCategory(foodItem.tags || "");
      setIsAvailable(foodItem.is_available || "");
    }
  }, [foodItem]);

  const fetchFoodItem = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/item/update/${id}/`,
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

  const handleImageUpload = async (files) => {
    const file = files[0];
    if (!file) return;
    setLoading(true);

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
    setFoodImage(imageUrl.url);
    setLoading(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/restaurant/item/update/${id}/`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            name: foodName,
            slug: foodName.toLowerCase().split(" ").join("-"),
            description,
            price,
            image: foodImage,
            category,
            tags: subCategory,
            is_available: isAvailable,
          }),
        }
      );
      const data = await res.json();


      if (res.ok) {
        return navigate("/restaurant/dashboard/food-items/");
      }

      setError(data);
    } else {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/item/add`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            name: foodName,
            slug: foodName.toLowerCase().split(" ").join("-"),
            description,
            price,
            image: foodImage,
            category,
            tags: subCategory,
            is_available: isAvailable,
          }),
        }
      );
      if (res.ok) {
        return navigate("/restaurant/dashboard/food-items/");
      }
      const data = await res.json();
      console.log(data);

      setError(data);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageUpload,
  });

  return (
    <div className="">
      <h2 className="text-3xl mb-5">
        {id ? "Update Food Item" : "Add Food Item"}
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-control space-y-2">
            <label htmlFor="name" className="text-md font-semibold">
              Product Name
            </label>
            <input
              type="text"
              className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
              placeholder="Product Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </div>
          <div className="form-control space-y-2">
            <label htmlFor="price" className="text-md font-semibold">
              Price
            </label>
            <input
              type="number"
              className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-control space-y-2">
            <label htmlFor="category" className="text-md font-semibold">
              Category
            </label>
            <select
              className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
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
            <label htmlFor="subCategory" className="text-md font-semibold">
              Sub Category
            </label>
            <select
              className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Select Sub Category</option>
              {foodTags?.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="description" className="text-md font-semibold">
            Description
          </label>
          <textarea
            type="text"
            className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300 resize-none"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>
        <div className="form-control space-y-2">
          <label className="text-md font-semibold">Product Image</label>
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center w-full h-48 border-dashed border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
          >
            <input {...getInputProps()} className="hidden" />
            <div className="flex flex-col items-center justify-center w-full h-44">
              {loading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <h4 className="text-gray-500">Uploading...</h4>
                </div>
              ) : (
                <>
                  <img
                    src={foodImage || "https://i.ibb.co.com/YPVDWT9/empty.jpg"}
                    alt="Upload Preview"
                    className="w-32 h-32 mb-2 rounded"
                  />
                  <h4 className="text-gray-500">
                    {foodImage ? "" : "Click to select a file to upload"}
                  </h4>
                </>
              )}
            </div>
          </div>
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
              error.slug ||
              error.image}
          </p>
        )}
        <div className="w-full flex items-center gap-3">
          <button type="submit" className="default-btn rounded py-3.5 px-6 w-fit">
            {id ? "Update" : "Submit"}
          </button>
          <button type="submit" className="default-btn rounded py-3.5 px-6 w-fit">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodItemForm;
