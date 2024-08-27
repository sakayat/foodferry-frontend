import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";
import { useProfileStore } from "../lib/store/zustandStore";

const ProfilePage = () => {

  const { user } = useProfileStore();

  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <BreadCrumbs link_name={"Profile"} />
        <div className="py-5">
          <h2 className="text-3xl">Profile Info</h2>
          {user?.role === "restaurant_owner" && (
            <button className="py-2">
              <Link to="/restaurant/dashboard/">
                Go to Restaurant Dashboard
              </Link>
            </button>
          )}
        </div>
        <div className="max-w-2xl profile space-y-5">
          <img src="/src/assets/images/profile.png" alt="" className="w-28" />
          <div className="border border-black/20 py-5 px-4">
            <div className="flex flex-col gap-2">
              <div>
                <span className="uppercase font-bold">Full Name</span>
                <div>
                  {user?.first_name || user?.last_name ? (
                    <span>
                      {user?.first_name} {user?.last_name}
                    </span>
                  ) : (
                    <span className="text-sm">Not provided</span>
                  )}
                </div>
              </div>
              <div>
                <span className="uppercase font-bold">Email</span>
                <div className="">{user?.email}</div>
              </div>
              <div>
                <span className="uppercase font-bold">Phone</span>
                <div className="">
                  {user?.phone_number ? (
                    <span>{user?.phone_number}</span>
                  ) : (
                    <span className="text-sm">Not provided</span>
                  )}
                </div>
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
