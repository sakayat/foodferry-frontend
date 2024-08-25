import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ViewCart = () => {
  return (
    <div className="pt-10">
      <div className="xl:container mx-auto px-8">
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
              <Link to="view-cart/">Cart</Link>
            </li>
          </ul>
        </div>
        <div className="py-5">
          <h2 className="text-3xl text-center">Your Cart</h2>
        </div>
        <div className="cart-title grid grid-cols-12 gap-5 border-b py-3">
          <div className="col-span-6">
            <span>Product Name</span>
          </div>
          <div className="col-span-3">
            <span>Quantity</span>
          </div>
          <div className="col-span-3">
            <span>Total</span>
          </div>
        </div>
        <div className="cart-item grid grid-cols-12 gap-5 py-5">
          <div className="col-span-6">
           
          </div>
          <div className="col-span-3">
           
          </div>
          <div className="col-span-3">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
