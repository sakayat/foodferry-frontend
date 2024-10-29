import { ChevronRight, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOrderStore } from "../lib/store/zustandStore";
import { currencyFormat } from "../lib/utils";

const OrderHistoryPage = () => {
  const { orderList, fetchOrderList } = useOrderStore();

  useEffect(() => {
    fetchOrderList();
  }, []);

  const [foodItem, setFoodItem] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const handleViewOrderItem = (item) => {
    setFoodItem(item);
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-5">
      <div className="xl:container mx-auto px-8 relative">
        <div className="breadcrumbs">
          <ul className="flex items-center gap-1">
            <li className="text-gray-600">
              <Link to="/" className="">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={15} />
            </li>
            <li>
              <Link to="/order-history">Order History</Link>
            </li>
          </ul>
        </div>
        <div className="py-5">
          <h2 className="text-3xl text-center">Order History</h2>
        </div>
        <div className="order-list h-screen">
          <div className="relative overflow-x-auto">
            {orderList.length === 0 ? (
              <p>No orders found</p>
            ) : (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Item name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {orderList.map((item) => (
                  <tbody key={item.id}>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.item_name}
                      </th>
                      <td className="px-6 py-4">
                        {currencyFormat(item.subtotal)}
                      </td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">
                        {item.status === "Paid" && (
                          <span className="bg-yellow-500 text-white rounded-full px-6 py-2 capitalize">
                            {item.status}
                          </span>
                        )}
                        {item.status === "Completed" && (
                          <span className="bg-green-800 text-white rounded-full px-6 py-2 capitalize">
                            {item.status}
                          </span>
                        )}
                        {item.status === "Canceled" && (
                          <span className="bg-red-600 text-white rounded-full px-6 py-2 capitalize">
                            {item.status}
                          </span>
                        )}
                        {item.status === "pending" && (
                          <span className="bg-orange-500 text-white rounded-full px-6 py-2 capitalize">
                            {item.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="default-btn py-2 px-4 rounded"
                          onClick={() => handleViewOrderItem(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            )}
          </div>
        </div>
        {isOpen && (
          <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="w-full md:max-w-xl mx-auto shadow-2xl bg-[#dde6ce] rounded-lg">
                <div className="flex h-40 text-sm relative">
                  <div className="absolute top-2 right-2 py-1 px-2 bg-[#286140] shadow-lg rounded">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="p-1"
                      aria-label="Close"
                    >
                      <X size={20} color="#FFFFFF" />
                    </button>
                  </div>
                  <img
                    src={foodItem.item_image}
                    alt={foodItem.item_name}
                    className="w-40 object-cover rounded-l-lg"
                  />
                  <div className="py-3 px-6 space-y-2">
                    <h3 className="text-lg font-semibold">
                      {foodItem.item_name}
                    </h3>
                    <div className="space-x-3">
                      <span className="font-medium">Price:</span>
                      <span>{currencyFormat(foodItem.item_price)}</span>
                    </div>
                    <div className="space-x-3">
                      <span className="font-medium">Quantity:</span>
                      <span>{foodItem.quantity}</span>
                    </div>
                    <div className="space-x-3">
                      <span className="font-medium">Restaurant:</span>
                      <span>{foodItem.restaurant}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
