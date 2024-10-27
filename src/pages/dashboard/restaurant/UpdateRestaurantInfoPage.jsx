import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useRestaurantInfo } from "../../../lib/store/zustandStore";

const UpdateRestaurantInfoPage = () => {
  const data = localStorage.getItem("user");
  const parseData = data ? JSON.parse(data) : {};
  const token = parseData.token;
  const navigate = useNavigate();
  8;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState();

  useEffect(() => {
    fetchRestaurantInfo();
  }, []);

  const { ownerInfo, fetchRestaurantInfo } = useRestaurantInfo();

  useEffect(() => {
    if (ownerInfo) {
      setName(ownerInfo.name || "");
      setAddress(ownerInfo.address || "");
      setPhoneNumber(ownerInfo.phone_number || "");
      setCoverImage(ownerInfo.cover_image || "");
    }
  }, [ownerInfo]);

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
    setCoverImage(imageUrl.url);
    setLoading(false);
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/update/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          name,
          address,
          phone_number: phoneNumber,
          cover_image: coverImage,
        }),
      }
    );

    const data = await res.json();

    setError(data);

    if (res.ok) {
      return navigate("/restaurant/dashboard/");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageUpload,
  });

  return (
    <div className="px-4 py-5">
      <div className="mb-5">
        <h2 className="text-3xl">Update Restaurant Info</h2>
      </div>
      <form className="space-y-5" onSubmit={handleUpdateInfo}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-control space-y-2">
            <label htmlFor="" className="text-md font-semibold">
              Restaurant Name
            </label>
            <input
              type="text"
              className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
              placeholder="restaurant name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control space-y-2">
            <label htmlFor="" className="text-md font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
              placeholder="phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Address
          </label>
          <textarea
            type="text"
            className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300 resize-none"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
          />
        </div>
        <div className="form-control space-y-2">
          <label className="text-md font-semibold">Cover Image</label>
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
                    src={coverImage || "https://i.ibb.co.com/YPVDWT9/empty.jpg"}
                    alt="Upload Preview"
                    className="w-32 h-32 mb-2 rounded"
                  />
                  <h4 className="text-gray-500">
                    {coverImage ? "" : "Click to select a file to upload"}
                  </h4>
                </>
              )}
            </div>
          </div>
        </div>
        {error && (
          <p className="text-rose-500 py-3">
            {error.name ||
              error.address ||
              error.phone_number ||
              error.cover_image}
          </p>
        )}
        <button className="default-btn rounded py-3.5 px-6 w-fit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurantInfoPage;
