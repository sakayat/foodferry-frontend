import { ChevronRight, User2Icon } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProfileStore } from "../lib/store/zustandStore";
import BreadCrumbs from "../components/BreadCrumbs";

const ProfilePage = () => {
  useEffect(() => {
    fetchProfileInfo();
  }, []);
  const { profileInfo, fetchProfileInfo } = useProfileStore();  

  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <BreadCrumbs link_name={"Profile"} />
        <div className="py-5">
          <h2 className="text-3xl">Profile Info</h2>
        </div>
        <div className="max-w-2xl profile space-y-5">
          <img src="/src/assets/images/profile.png" alt="" className="w-28" />
          <div className="border border-black/20 py-5 px-4">
            <div className="flex flex-col gap-2">
              <div>
                <span className="uppercase font-bold">Full Name</span>
                <div>
                  {profileInfo.first_name} {profileInfo.last_name}
                </div>
              </div>
              <div>
                <span className="uppercase font-bold">Email</span>
                <div className="">{profileInfo.email}</div>
              </div>
              <div>
                <span className="uppercase font-bold">Phone</span>
                <div className="">{profileInfo.phone_number}</div>
              </div>
            </div>
          </div>
          <button className="default-btn py-3 px-6">
            <Link to="/update-profile/">Update profile</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
