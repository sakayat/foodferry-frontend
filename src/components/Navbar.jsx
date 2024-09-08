import {
  List,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
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
  useProfileStore,
} from "../lib/store/zustandStore.jsx";

const Navbar = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const { user } = useProfileStore();

  const menuRef = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const { isCartOpen, setIsCartOpen } = useCartStore();
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
      localStorage.removeItem("authToken");
      clearCart();
      return navigate("sign-in/");
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchItem]);

  const fetchSearchResults = async () => {
    if (searchItem) {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/restaurant/search-food/?search=${searchItem}`
      );
      const data = await res.json();
      setSearchResults(data.results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="bg-white text-black border-b">
      <div className="xl:container mx-auto px-8">
        <nav className="py-4 flex items-center justify-between relative">
          <div className="logo flex items-center gap-2">
            <Link to="/" className="text-2xl uppercase">
              FoodFerry
            </Link>
            <button
              className="bg-black text-white py-2 px-4 rounded-full"
              onClick={() => setIsSearchModalOpen(true)}
            >
              <Search size={18} />
            </button>
          </div>
          {isSearchModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-start z-50">
              <div className="bg-white p-6 rounded w-96 h-screen overflow-y-auto relative">
                <div className="flex items-center justify-between pb-3">
                  <h2 className="text-xl font-bold">Search</h2>
                  <button
                    className="py-3 rounded"
                    onClick={() => setIsSearchModalOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <input
                  type="text"
                  className="py-3 px-6 border border-black w-full outline-none placeholder-gray-600 focus:border-gray-300 rounded"
                  placeholder="Search your favorite foods..."
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
                {searchItem && (
                  <div className="bg-white border border-gray-300 rounded mt-2 w-full">
                    <ul>
                      {searchResults?.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center p-2 hover:bg-gray-100"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <a
                              href={`/food/${item.slug}/`}
                              className="font-bold"
                              onClick={() =>
                                setIsSearchModalOpen(!isSearchModalOpen)
                              }
                            >
                              {item.name}
                            </a>
                            <div className="text-gray-500">${item.price}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
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
                <Link to={"restaurant-list/"} className="font-bold px-4">
                  Restaurant
                </Link>
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
              <div ref={dropdownRef}>
                <button
                  className="border w-12 h-12 rounded-full flex justify-center items-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {user.profile_image ? (
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/${
                        user.profile_image
                      }/`}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <User2Icon />
                  )}
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#286140] text-white rounded overflow-hidden shadow z-10">
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
                    <div className="py-2">
                      <button
                        onClick={() => handleLogout()}
                        className="px-4 py-2 text-sm flex items-center"
                      >
                        {" "}
                        <LogOut size={18} className="mr-2" />{" "}
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
