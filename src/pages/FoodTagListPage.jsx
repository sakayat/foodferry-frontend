import React, { useEffect, useState } from "react";
import { useFoodTagStore } from "../lib/store/zustandStore";
import { Edit, Trash2 } from "lucide-react";

const FoodTagListPage = () => {
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchTags();
  }, []);

  const { tags, fetchTags } = useFoodTagStore();

  const [showModal, setShowModal] = useState(false);
  const [tagItem, setTagItem] = useState({});

  const handleTagData = async (tag) => {
    setTagItem(tag);
    setError("");
    setShowModal(!showModal);
  };

  const [tagName, setTagName] = useState("");

  useEffect(() => {
    if (tagItem) {
      setTagName(tagItem.name || "");
    }
  }, [tagItem]);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      name: tagName,
      slug: tagName.toLowerCase().split(" ").join("-"),
    };

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/update-tag/${
        tagItem.id
      }/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(obj),
      }
    );

    if (res.ok) {
      setShowModal(!showModal);
    }

    const data = await res.json();

    setError(data);

    fetchTags();
  };

  const handleDeleteTag = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/delete-tag/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    fetchTags();
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-5">
      <div className="py-5">
        <h2 className="text-3xl">Tag List</h2>
      </div>
      <div className="category-list">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tag Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {tags?.map((tag) => (
              <tbody key={tag.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {tag.name}
                  </th>
                  <td className="px-6 py-4 space-x-5">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleTagData(tag)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-rose-600 hover:text-red-800"
                      onClick={() => handleDeleteTag(tag.id)}
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
              <h3 className="text-lg font-bold mb-4">Update Tag</h3>
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
                    placeholder="tag name"
                  />
                </div>
                {error && (
                  <p className="py-3 text-rose-500">
                    {error.name || error.slug}
                  </p>
                )}
                <div className="flex justify-end space-x-4">
                  <button type="submit" className="default-btn py-3.5 w-full">
                    Submit
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 w-full"
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

export default FoodTagListPage;
