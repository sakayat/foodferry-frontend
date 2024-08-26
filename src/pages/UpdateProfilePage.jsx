import React, { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import { useProfileStore } from "../lib/store/zustandStore";
import { useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const { profileInfo, fetchProfileInfo } = useProfileStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  useEffect(() => {
    if (profileInfo) {
      setFirstName(profileInfo.first_name || "");
      setLastName(profileInfo.last_name || "");
      setPhoneNumber(profileInfo.phone_number || "");
    }
  }, [profileInfo]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const obj = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/accounts/profile/`,
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
      return navigate("/profile/");
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
                type="text"
                className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
                placeholder="phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
