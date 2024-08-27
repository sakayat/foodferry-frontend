import { LogIn, Menu, ShoppingBag, ShoppingCart, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuCartItem from "./MenuCartItem";
import MobileNav from "./MobileNav";
import { useCartItemStore, useCartStore } from "../lib/store/zustandStore.jsx";

const Navbar = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const menuRef = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isCartOpen, setIsCartOpen } = useCartStore();

  const closeMenu = (e) => {
    if (menuRef.current && menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  const { cartItems, clearCart, fetchCartList } = useCartItemStore();  

  useEffect(() => {
    fetchCartList();
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isMenuOpen]);

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
      clearCart()
      return navigate("sign-in/");
    }
  };

  return (
    <div className="bg-white text-black border-b">
      <div className="xl:container mx-auto px-8">
        <nav className="py-4 flex items-center justify-between relative">
          <div className="logo">
            <Link
              to="/"
              className="text-3xl font-bold uppercase tracking-[0.3rem]"
            >
              DotEats
            </Link>
          </div>
          {/* mobile menu button */}
          <button
            className="md:hidden flex"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <Menu />
          </button>
          <ul className="hidden md:flex items-center gap-10">
            <li>
              <Link
                to="/"
                className="border border-[#286140] flex items-center rounded-full"
              >
                <span className="bg-[#286140] text-white p-2.5 rounded-full">
                  <ShoppingBag size={18} />
                </span>
                <span className="font-bold px-4">Restaurant</span>
              </Link>
            </li>
            <div className="relative">
              <button
                className="border border-[#286140] p-2.5 rounded-full"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart size={18} />
              </button>
              <span className="absolute top-0 bg-[#286140] font-bold w-6 h-6 flex justify-center left-8 rounded-full text-white">
                {cartItems?.total_quantity || 0}
              </span>
            </div>
            {token ? (
              <>
                <li>
                  <Link to="profile/">Profile</Link>
                </li>
                <li>
                  <Link to="order-history/">Orders</Link>
                </li>
                <li>
                  <button onClick={() => handleLogout()}>LogOut</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="sign-in/">Sign In</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      {/* mobile nav */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen z-80 bg-black/30"></div>
      )}
      {isMenuOpen && (
        <MobileNav setIsMenuOpen={setIsMenuOpen} menuRef={menuRef} />
      )}
      {isCartOpen && (
        <MenuCartItem setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
      )}
    </div>
  );
};

export default Navbar;
