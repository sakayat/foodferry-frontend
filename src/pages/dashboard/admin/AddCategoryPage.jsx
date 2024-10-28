import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const AddCategoryPage = () => {
  const data = localStorage.getItem("user");
  const parseData = data ? JSON.parse(data) : {};
  const token = parseData.token;
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

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
    setCategoryImage(imageUrl.url);
    setLoading(false);
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/category/`,
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
      // return navigate("/admin/dashboard/category-list");
    }
    const data = await res.json();
    console.log(data);
    
    setError(data);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageUpload,
  });

  return (
    <div className="px-4">
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
          <label className="text-md font-semibold">Category Image</label>
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
                    src={
                      categoryImage || "https://i.ibb.co.com/YPVDWT9/empty.jpg"
                    }
                    alt="Upload Preview"
                    className="w-32 h-32 mb-2 rounded"
                  />
                  <h4 className="text-gray-500">
                    {categoryImage ? "" : "Click to select a file to upload"}
                  </h4>
                </>
              )}
            </div>
          </div>
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
