import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurantInfo } from "../lib/store/zustandStore";

const UpdateRestaurantInfo = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const { ownerInfo } = useRestaurantInfo();

  useEffect(() => {
    if (ownerInfo) {
      setName(ownerInfo.name || "");
      setAddress(ownerInfo.address || "");
      setPhoneNumber(ownerInfo.phone_number || "");
      setCoverImage(ownerInfo.cover_image || "");
    }
  }, [ownerInfo]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append("name", name)
    formData.append("address", address)
    formData.append("phone_number", phoneNumber)
    formData.append("cover_image", coverImage)

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/update/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      }
    );

    if (res.ok) {
      return navigate("/restaurant/dashboard/");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="py-5">
        <h2 className="text-3xl">Update Restaurant Info</h2>
      </div>
      <form className="space-y-5" onSubmit={handleUpdateInfo}>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Restaurant Name
          </label>
          <input
            type="text"
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder="restaurant name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Address
          </label>
          <textarea
            type="text"
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300 resize-none"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={5}
          />
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder="phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-control space-y-2">
          <label htmlFor="" className="text-md font-semibold">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder="cover image"
            onChange={handleImageUpload}
          />
        </div>
        <button className="default-btn py-3.5 w-full">Submit</button>
      </form>
    </div>
  );
};

export default UpdateRestaurantInfo;
