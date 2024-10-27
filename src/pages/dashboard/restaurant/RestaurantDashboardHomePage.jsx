import {
  ShoppingCart,
  Clock,
  Box,
  DollarSign,
  Check,
  BanIcon,
} from "lucide-react";
import {
  useRestaurantDataStore,
  useRecentProductsStore,
} from "../../../lib/store/zustandStore";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { currencyFormat } from "../../../lib/utils";

const RestaurantDashboardHomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { restaurantData, fetchRestaurantData } = useRestaurantDataStore();
  const { recentProducts, fetchRecentProducts } = useRecentProductsStore();

  useEffect(() => {
    const loadRestaurantData = async () => {
      await fetchRestaurantData();
      await fetchRecentProducts();
      setIsLoading(false);
    };
    loadRestaurantData();
  }, []);

  const data = [
    {
      id: 1,
      title: "Total Orders",
      value: `${restaurantData.total_products}`,
      icon: <ShoppingCart className="w-5 h-5 text-white" />,
      bgColor: "bg-green-700",
    },
    {
      id: 2,
      title: "Pending Orders",
      value: `${restaurantData.pending_orders}`,
      icon: <Clock className="w-5 h-5 text-white" />,
      bgColor: "bg-yellow-500",
    },
    {
      id: 3,
      title: "Completed Orders",
      value: `${restaurantData.completed_orders}`,
      icon: <Check className="w-5 h-5 text-white" />,
      bgColor: "bg-green-500",
    },
    {
      id: 4,
      title: "Canceled Orders",
      value: `${restaurantData.cancel_orders}`,
      icon: <BanIcon className="w-5 h-5 text-white" />,
      bgColor: "bg-rose-500",
    },
    {
      id: 5,
      title: "Total Products",
      value: `${restaurantData.total_products}`,
      icon: <Box className="w-5 h-5 text-white" />,
      bgColor: "bg-blue-600",
    },
    {
      id: 6,
      title: "Total Sales",
      value: `${currencyFormat(restaurantData.total_sales)}`,
      icon: <DollarSign className="w-5 h-5 text-white" />,
      bgColor: "bg-purple-600",
    },
  ];

  const chartData = [
    { name: "Jan", sales: restaurantData?.monthly_sales?.Jan },
    { name: "Feb", sales: restaurantData?.monthly_sales?.Feb },
    { name: "Mar", sales: restaurantData?.monthly_sales?.Mar },
    { name: "Apr", sales: restaurantData?.monthly_sales?.Apr },
    { name: "May", sales: restaurantData?.monthly_sales?.May },
    { name: "Jun", sales: restaurantData?.monthly_sales?.Jun },
    { name: "Jul", sales: restaurantData?.monthly_sales?.Jul },
    { name: "Aug", sales: restaurantData?.monthly_sales?.Aug },
    { name: "Sep", sales: restaurantData?.monthly_sales?.Sep },
    { name: "Oct", sales: restaurantData?.monthly_sales?.Oct },
    { name: "Nov", sales: restaurantData?.monthly_sales?.Nov },
    { name: "Dec", sales: restaurantData?.monthly_sales?.Dec },
  ];

  if (isLoading) {
    return <p className="text-3xl text-center py-5">Loading...</p>;
  }

  return (
    <div className="px-4">
      <div className="grid grid-cols-1 gap-5 mt-6 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center px-5 py-6 bg-gray-100 rounded-md shadow-sm"
          >
            <div className={`p-3 ${item.bgColor} bg-opacity-75 rounded-full`}>
              {item.icon}
            </div>
            <div className="mx-5">
              <h4 className="text-xl font-semibold text-gray-700">
                {item.value}
              </h4>
              <div className="text-gray-500">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="w-full h-[400px] bg-white py-5 rounded">
          <h2 className="text-xl font-semibold mb-4">Overview Sales</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `৳${value}`}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                labelStyle={{ fontWeight: "bold" }}
                formatter={(value) => currencyFormat(value)}
              />
              <Bar
                dataKey="purchases"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
                name="Purchases"
              />
              <Bar
                dataKey="sales"
                fill="#82ca9d"
                radius={[4, 4, 0, 0]}
                name="Sales"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white h-[400px] py-5">
          <div className="px-6 pb-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Recently Added Products
            </h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 font-semibold text-gray-700">#</th>
                    <th className="pb-3 font-semibold text-gray-700">
                      Products
                    </th>
                    <th className="pb-3 font-semibold text-gray-700 text-right">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentProducts.map((product) => (
                    <tr key={product.id} className="border-b last:border-b-0">
                      <td className="py-3 w-20 font-medium text-gray-800">
                        {product.id}
                      </td>
                      <td className="py-3 text-gray-600">
                        <div className="flex items-center gap-2">
                          <img
                            src={product.image}
                            alt=""
                            className="w-8 h-8 rounded object-cover"
                          />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-600 text-right">
                        {currencyFormat(product.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardHomePage;
