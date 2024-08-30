import { MapPin, Phone } from "lucide-react";
import { useRestaurantInfo } from "../lib/store/zustandStore";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const RestaurantDashboardHome = () => {

  useEffect(() => {
    fetchRestaurantInfo();
  }, []);

  const { ownerInfo, fetchRestaurantInfo } = useRestaurantInfo();

  return (
    <div className="py-5 px-8 bg-[#dde6ce] shadow">
      <div className="relative flex flex-col gap-5">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/${ownerInfo.cover_image}`}
          alt=""
          className="lg:h-48 w-24 lg:w-48 rounded-xl"
        />
        <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold  uppercase text-black">
          {ownerInfo.name}
        </h1>
      </div>
      <div className="max-w-3xl space-y-3 py-5">
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
      <div className="flex justify-end">
        <Link to="update-restaurant-info/" className="py-3 px-6 ">
          <button className="default-btn py-3 px-6">Update Info</button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantDashboardHome;
