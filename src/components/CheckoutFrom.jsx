import React, { useEffect, useState } from "react";
import {
  useCartItemStore,
  useRenderProfileInfoStore,
  useOrderStore,
} from "../lib/store/zustandStore";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutFrom = ({ cartItems }) => {
  const data = localStorage.getItem("user");
  const parseData = data ? JSON.parse(data) : {};
  const token = parseData.token;

  const navigate = useNavigate();
  const location = useLocation();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const { fetchCartList } = useCartItemStore();
  const { fetchOrderList } = useOrderStore();

  const { user, fetchProfileInfo } = useRenderProfileInfoStore();

  useEffect(() => {
    fetchProfileInfo(token);
  }, []);

  const [errors, setErrors] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!user.first_name || !user.last_name || !user.phone_number) {
      return setErrors({
        profileError: "first name, last name and phone number is required",
      });
    }
    const obj = {
      address: address,
      payment_method: paymentMethod,
    };

    if (paymentMethod === "online_payment") {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/${cartItems.user}/`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            total_amount: cartItems.total_price,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        window.location.href = data.redirect_url;
      }
    } else {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(obj),
        }
      );
      const data = await res.json();
      setErrors({ error: data.error });
      if (user.first_name && user.phone_number && user.last_name) {
        fetchCartList();
        fetchOrderList();
        return navigate("/order-history");
      }
    }
  };

  const handleNavigate = () => {
    return navigate("/update-profile/", {
      state: { returnTo: location.pathname },
    });
  };

  return (
    <form
      className="space-y-3 col-span-12 md:col-span-7"
      onSubmit={handleOnSubmit}
    >
      <div className="form-control space-y-2">
        <label htmlFor="" className="text-xl">
          Email
        </label>
        <input
          type="email"
          className="py-3 px-6 border border-black rounded w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
          placeholder={user.email}
          disabled
        />
      </div>
      <div className="form-control space-y-2">
        <label htmlFor="" className="text-xl">
          Phone
        </label>
        <input
          type="email"
          className="py-3 px-6 border rounded border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
          placeholder={user.phone_number}
          disabled
        />
      </div>
      <div className="flex flex-col md:flex-row  gap-5 w-full">
        <div className="form-control space-y-2 w-full">
          <label htmlFor="" className="text-xl">
            First Name
          </label>
          <input
            type="text"
            className="py-3 px-6 border rounded border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder={user.first_name}
            disabled
          />
        </div>
        <div className="form-control space-y-2 w-full">
          <label htmlFor="" className="text-xl">
            Last Name
          </label>
          <input
            type="text"
            className="py-3 px-6 border rounded border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
            placeholder={user.last_name}
            disabled
          />
        </div>
      </div>
      <div className="form-control space-y-2">
        <label htmlFor="" className="text-xl">
          Address
        </label>
        <textarea
          type="text"
          className="py-3 px-6 border rounded border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300 resize-none"
          placeholder="Address"
          rows={3}
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="form-control space-y-2">
        <label htmlFor="" className="text-xl">
          Payment
        </label>
        <div className="flex items-center gap-3 py-3 px-6 border rounded border-black">
          <select
            className="w-full h-full outline-none"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Payment method</option>
            <option value="cash_on_delivery">Cash On Delivery</option>
            <option value="online_payment">Online Payment</option>
          </select>
        </div>
      </div>
      {errors && (
        <p className="py-3 text-rose-500">
          {errors.error || errors.profileError}
        </p>
      )}
      {errors?.profileError && (
        <button onClick={() => handleNavigate()}>Update your profile</button>
      )}
      {paymentMethod === "online_payment" ? (
        <button className="default-btn rounded py-3 px-6 w-full">
          Make Payment
        </button>
      ) : (
        <button className="default-btn rounded py-3 px-6 w-full">
          Place order
        </button>
      )}
    </form>
  );
};

export default CheckoutFrom;
