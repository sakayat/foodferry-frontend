import { MapPin, Phone } from "lucide-react";
import React from "react";
import { useRestaurantInfo } from "../lib/store/zustandStore";

const RestaurantDashboardHome = () => {
  const { ownerInfo } = useRestaurantInfo();

  return (
    <div className="py-5 px-8 bg-[#dde6ce] shadow">
      <div className="max-w-3xl space-y-3">
        <h2 className="text-3xl">Restaurant Information</h2>
        <div className="info space-y-5">
          <p className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{ownerInfo.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone size={18} />
            <span>{ownerInfo.phone_number}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardHome;
