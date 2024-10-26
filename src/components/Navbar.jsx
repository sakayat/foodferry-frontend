import {
  List,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  User2Icon,
  UserCircle,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuCartItem from "./MenuCartItem";
import MobileNav from "./MobileNav";
import {
  useCartItemStore,
  useCartStore,
  useRenderProfileInfoStore,
} from "../lib/store/zustandStore.jsx";
import SearchModal from "./SearchModal.jsx";

const Navbar = () => {
  const data = localStorage.getItem("user");
  const parseData = data ? JSON.parse(data) : {};
  const token = parseData.token;
  const navigate = useNavigate();

  
  const { user, fetchProfileInfo } = useRenderProfileInfoStore();

  useEffect(() => {
    const getUserProfile = async () => {
      await fetchProfileInfo();
    };
    getUserProfile();
  }, []);

  const menuRef = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const closeDropDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closeDropDown);

    return () => {
      document.removeEventListener("click", closeDropDown);
    };
  }, [isOpen]);

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
      localStorage.setItem("user", JSON.stringify("user"));
      clearCart();
      navigate("/sign-in");
    }
  };

  return (
    <div className="bg-white text-black border-b fixed w-full z-50">
      <div className="xl:container mx-auto px-8">
        <nav className="py-4 flex items-center justify-between relative">
          <div className="logo flex items-center gap-2">
            <Link to="/" className="text-2xl uppercase font-bold">
              FoodFerry
            </Link>
            <button
              className="bg-[#286140] text-white py-2 px-4 rounded-full w-14 h-8 flex items-center justify-center"
              onClick={() => setIsSearchModalOpen(true)}
            >
              <Search size={18} />
            </button>
          </div>
          {/* search modal */}
          <SearchModal
            isSearchModalOpen={isSearchModalOpen}
            setIsSearchModalOpen={setIsSearchModalOpen}
          />
          {/* mobile menu button */}
          <button
            className="md:hidden flex"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <Menu />
          </button>
          <ul className="hidden md:flex items-center gap-5">
            <li className="">
              <Link to="our-menu/">Our menu</Link>
            </li>
            <li className="">
              <Link to="/about">About</Link>
            </li>
            <li className="">
              <Link to="/contact">Contacts</Link>
            </li>
            <li>
              <Link
                to="/restaurant-list/"
                className="border border-[#286140] flex items-center rounded-full"
              >
                <span className="bg-[#286140] text-white p-2.5 rounded-full">
                  <ShoppingBag size={18} />
                </span>
                <span className="px-4">Restaurant</span>
              </Link>
            </li>
            {parseData.role !== "admin" &&
              parseData.role !== "restaurant_owner" && (
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
              )}
            <div className="" ref={dropdownRef}>
              {token ? (
                <div>
                  <button
                    className="border w-12 h-12 rounded-full flex justify-center items-center"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {user.profile_image ? (
                      <img
                        src={user.profile_image}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <User2Icon />
                    )}
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-[#286140] opacity-90 text-white rounded overflow-hidden shadow z-10 px-2">
                      <div className="p-3 border-b font-medium text-md">
                        <span className="">{user.username}</span>
                      </div>
                      <div className="py-2 border-b">
                        <Link
                          to="profile/"
                          className="px-4 py-2 text-sm flex items-center"
                          onClick={() => setIsOpen(false)}
                        >
                          <UserCircle size={18} className="mr-2" />
                          <span>Profile</span>
                        </Link>
                      </div>
                      {parseData.role !== "admin" &&
                        parseData.role !== "restaurant_owner" && (
                          <div className="py-2 border-b">
                            <Link
                              to="order-history/"
                              className="px-4 py-2 text-sm flex items-center"
                              onClick={() => setIsOpen(false)}
                            >
                              <List size={18} className="mr-2" />
                              <span>Orders</span>
                            </Link>
                          </div>
                        )}
                      <div className="py-2">
                        <button
                          onClick={() => handleLogout()}
                          className="px-4 py-2 text-sm flex items-center"
                        >
                          <LogOut size={18} className="mr-2" />
                          <span>LogOut</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <li>
                  <Link to="sign-in/">Sign In</Link>
                </li>
              )}
            </div>
          </ul>
        </nav>
      </div>
      {/* mobile nav */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen z-80 bg-black/30"></div>
      )}
      {isMenuOpen && (
        <MobileNav
          setIsMenuOpen={setIsMenuOpen}
          menuRef={menuRef}
          user={user}
        />
      )}
      {isCartOpen && (
        <MenuCartItem setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
      )}
    </div>
  );
};

export default Navbar;
