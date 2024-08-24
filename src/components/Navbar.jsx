import { LogIn, Menu, ShoppingBag, ShoppingCart, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MenuCartItem from "./MenuCartItem";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const menuRef = useRef();

  const [cartOpen, setCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = (e) => {
    if (menuRef.current && menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isMenuOpen]);

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
                <span className="font-bold px-4">Store</span>
              </Link>
            </li>
            <div className="relative">
              <button
                className="border border-[#286140] p-2.5 rounded-full"
                onClick={() => setCartOpen((prev) => !prev)}
              >
                <ShoppingCart size={18} />
              </button>
              <span className="absolute top-0 bg-[#286140] font-bold w-6 h-6 flex justify-center left-8 rounded-full text-white">
                3
              </span>
            </div>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* mobile nav */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen z-80 bg-black/30"></div>
      )}
      {isMenuOpen && <MobileNav setCartOpen={setCartOpen} menuRef={menuRef} />}
      {cartOpen && <MenuCartItem setCartOpen={setCartOpen} />}
    </div>
  );
};

export default Navbar;
