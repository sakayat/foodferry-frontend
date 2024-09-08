import React, { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import { useRenderProfileInfoStore } from "../lib/store/zustandStore";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const { user, fetchProfileInfo } = useRenderProfileInfoStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setPhoneNumber(user.phone_number || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone_number", phoneNumber);
    formData.append("profile_image", profileImage);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/accounts/profile/`,
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
      return navigate(location.state?.returnTo || "/profile/");
    }
  };

  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <BreadCrumbs link_name={"Update Profile"} />
        <div className="py-5">
          <h3 className="text-3xl">Update Profile</h3>
        </div>
        <div className="max-w-2xl">
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleUpdateProfile}
          >
            <div className="form-control space-y-2">
              <label htmlFor="" className="text-xl">
                First Name
              </label>
              <input
                type="text"
                className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
                placeholder="first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control space-y-2">
              <label htmlFor="" className="text-xl">
                Last Name
              </label>
              <input
                type="text"
                className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
                placeholder="last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-control space-y-2">
              <label htmlFor="" className="text-xl">
                Phone Number
              </label>
              <input
                inputMode="numeric"
                className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
                placeholder="phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-control space-y-2">
              <label htmlFor="" className="text-md font-semibold">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
                onChange={handleImageUpload}
              />
            </div>
            <button className="default-btn py-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
