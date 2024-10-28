import { ShoppingCart, Clock, Check, BanIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAdminDataStore } from "../../../lib/store/zustandStore";
import { useEffect, useState } from "react";
import { currencyFormat } from "../../../lib/utils";

const AdminDashboardHomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { adminData, fetchAdminData } = useAdminDataStore();

  useEffect(() => {
    const loadAdminData = async () => {
      await fetchAdminData();
      setIsLoading(false);
    };
    loadAdminData();
  }, []);

  const data = [
    {
      id: 1,
      title: "Total Orders",
      value: `${adminData.total_orders}`,
      icon: <ShoppingCart className="w-5 h-5 text-white" />,
      bgColor: "bg-[#FF9F43]",
    },
    {
      id: 2,
      title: "Total Revenue",
      value: `${currencyFormat(adminData.total_revenue)}`,
      icon: <Clock className="w-5 h-5 text-white" />,
      bgColor: "bg-[#28C76F]",
    },
    {
      id: 3,
      title: "Active Restaurants",
      value: `${adminData.active_restaurants}`,
      icon: <Check className="w-5 h-5 text-white" />,
      bgColor: "bg-[#00CFE8]",
    },
    {
      id: 4,
      title: "Active Customers",
      value: `${adminData.active_customers}`,
      icon: <BanIcon className="w-5 h-5 text-white" />,
      bgColor: "bg-[#1B2850]",
    },
  ];

  const chartData = [
    { name: "Fri", revenue: adminData.daily_revenue?.Fri },
    { name: "Sat", revenue: adminData.daily_revenue?.Sat },
    { name: "Sun", revenue: adminData.daily_revenue?.Sun },
    { name: "Mon", revenue: adminData.daily_revenue?.Mon },
    { name: "Tue", revenue: adminData.daily_revenue?.Tue },
    { name: "Wed", revenue: adminData.daily_revenue?.Wed },
    { name: "Thu", revenue: adminData.daily_revenue?.Thu },
  ];

  if (isLoading) {
    return <p className="text-3xl text-center py-5">Loading...</p>;
  }

  return (
    <div className="px-4 py-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
        {data.map((item, id) => (
          <div
            key={id}
            className={`${item.bgColor} overflow-hidden shadow rounded-lg`}
          >
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-white truncate">
                {item.title}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-white">
                {item.value}
              </dd>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="w-full h-[400px] bg-white py-5 rounded">
          <h2 className="text-xl font-semibold mb-4">Daily Revenue</h2>
          <div className="mt-4" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHomePage;
