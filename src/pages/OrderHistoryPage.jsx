import { ChevronRight, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOrderStore } from "../lib/store/zustandStore";
import { currencyFormat } from "../lib/utils";

const OrderHistoryPage = () => {
  useEffect(() => {
    fetchOrderList();
  }, []);

  const { orderList, fetchOrderList } = useOrderStore();

  const [foodItem, setFoodItem] = useState();

  console.log(foodItem);

  const [isOpen, setIsOpen] = useState(false);

  const handleViewOrderItem = (item) => {
    setFoodItem(item);
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-5">
      <div className="xl:container mx-auto px-8 relative">
        <div className="breadcrumbs">
          <ul className="flex items-center gap-1 py-5">
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
        <div className="order-list">
          <div className="relative overflow-x-auto">
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
                      <button
                        className="default-btn py-2 px-4"
                        onClick={() => handleViewOrderItem(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
        {isOpen && (
          <div className="absolute top-0 left-0 right-0 w-full h-full backdrop-blur-sm">
            <div className="bg-white">
              <div className="max-w-xl mx-auto shadow-2xl bg-white">
                <div className="">
                  <div className="flex justify-end py-2 px-4">
                    <button onClick={() => setIsOpen(!isOpen)}>
                      <X />
                    </button>
                  </div>
                  <div className="">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/media/${
                        foodItem.item_image
                      }`}
                      alt=""
                    />
                    <div className="py-3 px-6 space-y-2">
                      <h3 className="text-2xl">{foodItem.item_name}</h3>
                      <div className="space-x-3">
                        <span>Price:</span>
                        <span>{currencyFormat(foodItem.item_price)}</span>
                      </div>
                      <div className="space-x-3">
                        <span>Quantity:</span>
                        <span>{foodItem.quantity}</span>
                      </div>
                      <div className="space-x-3">
                        <span>Restaurant:</span>
                        <span>{foodItem.restaurant}</span>
                      </div>
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
