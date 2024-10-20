import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useFoodCategoriesStore } from "../../../lib/store/zustandStore";

const CategoryListPage = () => {
  const token = localStorage.getItem("authToken");
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
    const res = await fetch(
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
    <div className="max-w-6xl mx-auto px-8 py-5">
      <div className="py-5">
        <h2 className="text-3xl">Category List</h2>
      </div>
      <div className="category-list">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {categories?.map((category) => (
              <tbody key={category.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={category.image}
                        alt=""
                        className="w-20 h-20 rounded"
                      />
                      {category.name}
                    </div>
                  </th>
                  <td className="px-6 py-4 space-x-5">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleCategoryData(category)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-rose-600 hover:text-red-800"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
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
