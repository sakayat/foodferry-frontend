import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { useRenderProfileInfoStore } from "../../lib/store/zustandStore";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  const data = localStorage.getItem("user");
  const parseData = data ? JSON.parse(data) : {};
  const token = parseData.token;
  const navigate = useNavigate();
  const location = useLocation();

  const { user, fetchProfileInfo } = useRenderProfileInfoStore();

  useEffect(() => {
    fetchProfileInfo(token);
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);
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
    setProfileImage(imageUrl.url);
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

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/accounts/profile/`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            profile_image: profileImage,
          }),
        }
      );

      const data = await res.json();

      setError(data);

      if (res.ok) {
        navigate(location.state?.returnTo || "/profile/");
        fetchProfileInfo();
      }
    } catch (error) {
      console.log("something went wrong");
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
                className="py-3 px-6 border rounded border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
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
                className="py-3 px-6 border rounded border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
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
                className="py-3 px-6 border rounded border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
                placeholder="phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-control space-y-2">
              <label htmlFor="" className="text-md font-semibold">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="py-2.5 px-6 border rounded border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
                onChange={handleImageUpload}
              />
            </div>
            {error && (
              <p className="py-3 text-rose-500">
                {error.phone_number || error.profile_image}
              </p>
            )}
            <button className="default-btn rounded py-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
