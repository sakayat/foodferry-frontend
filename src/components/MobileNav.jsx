import React from "react";
import { Link } from "react-router-dom";
import { LogIn, X } from "lucide-react";

const MobileNav = ({ setIsCartOpen, menuRef }) => {
  return (
    <div className="absolute left-0 bg-white w-96 z-20 min-h-[calc(100dvh-5rem)] border-t">
      <ul className="flex flex-col px-3">
        <li className="flex justify-between py-3 border-b" ref={menuRef}>
          <Link>Menu</Link>
          <button>
            <X size={18} />
          </button>
        </li>
        <li className="py-3 border-b">
          <Link>Home</Link>
        </li>
        <li className="py-3 border-b">
          <Link to="/" className="flex items-center rounded-full">
            Store
          </Link>
        </li>
        <div className="flex justify-between items-center py-3 border-b">
          <button className="" onClick={() => setIsCartOpen((prev) => !prev)}>
            Cart
          </button>
          <span className="bg-[#286140] text-white w-6 h-6 flex justify-center rounded-full">
            3
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 w-full bg-[#286140] text-white px-3">
          <li className="py-3">
            <Link to="/sign-in" className="flex items-center gap-3">
              <LogIn size={18} />
              <span className="font-bold">Sign In</span>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default MobileNav;
