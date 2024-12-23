import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { currencyFormat } from "../../../lib/utils";
import { useRestaurantOrderStore } from "../../../lib/store/zustandStore";

const UserOrderListPage = () => {
  const data = localStorage.getItem("user");
  const parseData = data ? JSON.parse(data) : {};
  const token = parseData.token;
  const [showModal, setShowModal] = useState(false);

  const [orderId, setOrderId] = useState(null);

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
    { value: "Canceled", label: "Canceled" },
  ];

  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchUserOrderList();
  }, []);

  const { orderList, fetchUserOrderList } = useRestaurantOrderStore();

  const handleStatus = async (order) => {
    setShowModal(true);
    setStatus(order.status);
    setOrderId(order.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/order-status/${orderId}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );
    if (res.ok) {
      setShowModal(false);
    }
    fetchUserOrderList();
  };

  return (
    <div className="px-4 py-5">
      <div className="mb-5">
        <h2 className="text-3xl">All Order</h2>
      </div>
      <div className="user-order mb-8">
        {!orderList.error ? (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order Menu
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {orderList?.map((order) => (
                <tbody key={order.id}>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.item_name}
                    </td>
                    <td className="px-6 py-4">
                      {currencyFormat(order.subtotal)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`py-1 px-6 rounded-full ${
                          order.status === "Pending"
                            ? "bg-yellow-500 text-white"
                            : order.status === "Completed"
                            ? "bg-green-800 text-white"
                            : order.status === "Canceled"
                            ? "bg-red-400 text-white"
                            : "py-1 px-6 rounded-full"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                        onClick={() => handleStatus(order)}
                      >
                        <Edit size={18} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        ) : (
          <h4>{orderList.error}</h4>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white shadow-lg p-6 w-full max-w-lg rounded">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Update Status
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group space-y-2">
                <label htmlFor="" className="text-md font-semibold">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="py-3 px-6 border border-black w-full outline-none rounded"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-300 text-gray-900 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="py-2 px-4 default-btn rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderListPage;
