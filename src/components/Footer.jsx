import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 z-50 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-5xl font-bold mb-4">
              <Link to="/">FoodFerry</Link>
            </h3>
            <p className="text-lg">
              Delivering delicious meals to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="restaurant-list/" className="hover:text-gray-300">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="our-menu/" className="hover:text-gray-300">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="about/" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="contact/" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">Asfia Tower, House - 76 Rd No. 11, Dhaka 1213</p>
            <p className="text-sm">Phone: (555) 123-4567</p>
            <p className="text-sm">Email: info@foodferry.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; 2024 FoodFerry All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
