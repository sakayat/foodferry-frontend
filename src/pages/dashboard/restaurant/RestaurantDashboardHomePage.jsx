import { MapPin, Phone, ShoppingBag } from "lucide-react";
import {
  useRestaurantInfo,
  useRestaurantOrderStore,
} from "../../../lib/store/zustandStore";
import { useEffect, useState } from "react";

const RestaurantDashboardHomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { ownerInfo, fetchRestaurantInfo } = useRestaurantInfo();
  const { orderList, fetchUserOrderList } = useRestaurantOrderStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRestaurantInfo();
        await fetchUserOrderList();
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = [
    {
      title: "Total Orders",
      value: orderList.length,
      icon: <ShoppingBag size={30} />,
    },
  ];

  if (isLoading) {
    return <p className="text-3xl text-center py-5">Loading...</p>;
  }

  return (
    <div className="py-5 px-8">
      <div>
        <div className="relative flex flex-col gap-5">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/${
              ownerInfo.cover_image
            }`}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item, i) => (
            <div
              className="flex items-center justify-between gap-2 py-3 px-6 border border-black"
              key={i}
            >
              <div className="flex items-center space-x-3">
                <span>{item.icon}</span>
                <div className="text-xl font-medium">{item.title}</div>
              </div>
              <div className="text-4xl font-bold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardHomePage;
