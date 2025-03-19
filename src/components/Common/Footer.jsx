import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="text-gray-100">
      {/* Top Section - Light Gray Background */}
      <div className="bg-gray-100 text-gray-800 py-12 relative">
        <div className="container mx-auto px-6">
          {/* Mask effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-10"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm relative z-10">
            {/* Column 1 - Shop */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/daily-deals" className="hover:text-blue-500 cursor-pointer">
                    Daily Deals
                  </Link>
                </li>
                <li>
                  <Link to="/app-deals" className="hover:text-blue-500 cursor-pointer">
                    App Only Deals
                  </Link>
                </li>
                <li>
                  <Link to="/clearance-sale" className="hover:text-blue-500 cursor-pointer">
                    Clearance Sale
                  </Link>
                </li>
                <li>
                  <Link to="/gift-vouchers" className="hover:text-blue-500 cursor-pointer">
                    Gift Vouchers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 - Account */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Account</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/my-account" className="hover:text-blue-500 cursor-pointer">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/track-order" className="hover:text-blue-500 cursor-pointer">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="hover:text-blue-500 cursor-pointer">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link to="/invoices" className="hover:text-blue-500 cursor-pointer">
                    Invoices
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Help */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Help</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/help-center" className="hover:text-blue-500 cursor-pointer">
                    Help Centre
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-500 cursor-pointer">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-delivery" className="hover:text-blue-500 cursor-pointer">
                    Shipping & Delivery
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="hover:text-blue-500 cursor-pointer">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Company */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about-us" className="hover:text-blue-500 cursor-pointer">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-blue-500 cursor-pointer">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/sell" className="hover:text-blue-500 cursor-pointer">
                    Sell on Fintech
                  </Link>
                </li>
                <li>
                  <Link to="/press-news" className="hover:text-blue-500 cursor-pointer">
                    Press & News
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5 - Policy */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Policy</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/returns-policy" className="hover:text-blue-500 cursor-pointer">
                    Returns Policy
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="hover:text-blue-500 cursor-pointer">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-blue-500 cursor-pointer">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Blue Background */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-1 flex flex-wrap justify-between items-center pb-2">
          {/* App Download Buttons */}
          <div className="mb-6 md:mb-0">
            <h4 className="font-semibold mb-1">Download Our Apps</h4>
            <div className="flex space-x-3">
              <button className="flex items-center bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                <FaApple className="text-2xl mr-2" /> App Store
              </button>
              <button className="flex items-center bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                <FaGooglePlay className="text-2xl mr-2" /> Google Play
              </button>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="font-semibold mb-1">Follow Us</h4>
            <div className="flex space-x-4">
              <FaFacebookF className="text-xl cursor-pointer hover:text-blue-400" />
              <FaTwitter className="text-xl cursor-pointer hover:text-blue-300" />
              <FaInstagram className="text-xl cursor-pointer hover:text-pink-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-blue-900 border-t border-gray-600 text-center py-6 text-sm">
        <p>&copy; {new Date().getFullYear()} Fintech. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-1">
          <FaCcVisa className="text-2xl text-white hover:text-gray-300" />
          <FaCcMastercard className="text-2xl text-white hover:text-gray-300" />
          <FaCcPaypal className="text-2xl text-white hover:text-gray-300" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
