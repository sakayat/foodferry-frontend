import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, User, User2, X } from "lucide-react";
import { useCartItemStore } from "../lib/store/zustandStore";

const MobileNav = ({ setIsCartOpen, setIsMenuOpen, menuRef }) => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartList(token);
  }, []);

  const { cartItems, fetchCartList } = useCartItemStore();

  const handleLogout = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/accounts/logout/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (res.ok) {
      localStorage.removeItem("authToken");
      return navigate("sign-in/");
    }
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="absolute left-0 bg-white w-96 z-20 min-h-[calc(100dvh-4rem)] border-t">
      <ul className="flex flex-col px-3">
        <li className="flex justify-between py-3 border-b" ref={menuRef}>
          <Link>Menu</Link>
          <button>
            <X size={18} />
          </button>
        </li>
        <li className="py-3 border-b">
          <Link to="/" onClick={() => setIsCartOpen((prev) => !prev)}>
            Home
          </Link>
        </li>
        <li className="py-3 border-b">
          <Link
            to="restaurant-list/"
            className="flex items-center rounded-full"
            onClick={() => setIsCartOpen((prev) => !prev)}
          >
            Restaurant
          </Link>
        </li>

        {token && (
          <li className="py-3 border-b">
            <Link
              to="order-history/"
              className="flex items-center gap-3"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Orders
            </Link>
          </li>
        )}
        <div className="flex justify-between items-center py-3 border-b">
          <Link
            to="view-cart/"
            className=""
            onClick={() => setIsCartOpen((prev) => !prev)}
          >
            Cart
          </Link>
          <span className="bg-[#286140] text-white w-6 h-6 flex justify-center rounded-full">
            {cartItems?.total_quantity || 0}
          </span>
        </div>

        <div className="absolute bottom-0 inset-x-0 w-full bg-[#286140] text-white px-3">
          {token ? (
            <div className="flex justify-between py-3">
              <li>
                <Link
                  to="profile/"
                  className="flex items-center gap-3"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  <span>
                    <User />
                  </span>
                  <span className="font-bold">Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleLogout()}
                  className="flex items-center gap-3"
                >
                  <span>
                    <LogOut size={18} />
                  </span>
                  <span className="font-bold">LogOut</span>
                </button>
              </li>
            </div>
          ) : (
            <li className="py-3">
              <Link
                to="sign-in/"
                className="flex items-center gap-3"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <LogIn size={18} />
                <span className="font-bold">Sign In</span>
              </Link>
            </li>
          )}
        </div>
      </ul>
    </div>
  );
};

export default MobileNav;
