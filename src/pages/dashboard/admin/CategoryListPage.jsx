import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useFoodCategoriesStore } from "../../../lib/store/zustandStore";

const CategoryListPage = () => {
  const data = localStorage.getItem("user");
  const parseData = data ? JSON.parse(data) : {};
  const token = parseData.token;

  useEffect(() => {
    fetchCategories();
  }, []);

  const { categories, fetchCategories } = useFoodCategoriesStore();

  const [showModal, setShowModal] = useState(false);
  const [categoryItem, setCategoryItem] = useState({});

  const handleCategoryData = async (category) => {
    setCategoryItem(category);
    setShowModal(!showModal);
  };

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  useEffect(() => {
    if (categoryItem) {
      setCategoryName(categoryItem.name || "");
      setCategoryImage(categoryItem.image);
    }
  }, [categoryItem]);

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
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/category/update/${
        categoryItem.id
      }/`,
      {
        method: "PUT",
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
      setShowModal(!showModal);
    }
    const data = await res.json();
    setError(data);
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/restaurant/category/delete/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    fetchCategories();
  };

  return (
    <div className="px-4 py-5">
      <div className="mb-5">
        <h2 className="text-3xl">Category List</h2>
      </div>
      <div className="category-list">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.length ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="bg-white border border-gray-200"
              >
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h2 className="text-lg font-semibold text-white">
                      {category.name}
                    </h2>
                  </div>
                </div>
                <div className="flex justify-between p-4">
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => handleCategoryData(category)}
                    aria-label={`Edit ${category.name}`}
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    className="text-rose-600 hover:text-red-800"
                    onClick={() => handleDeleteCategory(category.id)}
                    aria-label={`Delete ${category.name}`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No categories available.
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center w-full z-50 bg-black bg-opacity-50">
          <div className="w-full">
            <div className="max-w-xl mx-auto bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">Update Category</h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="form-control space-y-2">
                  <label htmlFor="" className="text-md font-semibold">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
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
                    className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
                    onChange={handleImageUpload}
                  />
                </div>

                {error && (
                  <p className="py-3 text-rose-500">
                    {error.name || error.slug || error.image}
                  </p>
                )}
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="default-btn rounded py-3.5 w-full"
                  >
                    Submit
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 w-full rounded"
                    onClick={() => setShowModal(!showModal)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryListPage;
