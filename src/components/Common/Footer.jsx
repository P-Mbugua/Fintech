import React from "react";
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
           
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Shop</h4>
              <ul className="space-y-2">
                <li className="hover:text-blue-500 cursor-pointer">Daily Deals</li>
                <li className="hover:text-blue-500 cursor-pointer">App Only Deals</li>
                <li className="hover:text-blue-500 cursor-pointer">Clearance Sale</li>
                <li className="hover:text-blue-500 cursor-pointer">Gift Vouchers</li>
              </ul>
            </div>

            {/* Column 2 - Account */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Account</h4>
              <ul className="space-y-2">
                <li className="hover:text-blue-500 cursor-pointer">My Account</li>
                <li className="hover:text-blue-500 cursor-pointer">Track Order</li>
                <li className="hover:text-blue-500 cursor-pointer">Returns</li>
                <li className="hover:text-blue-500 cursor-pointer">Invoices</li>
              </ul>
            </div>

            {/* Column 3 - Help */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Help</h4>
              <ul className="space-y-2">
                <li className="hover:text-blue-500 cursor-pointer">Help Centre</li>
                <li className="hover:text-blue-500 cursor-pointer">Contact Us</li>
                <li className="hover:text-blue-500 cursor-pointer">Shipping & Delivery</li>
                <li className="hover:text-blue-500 cursor-pointer">Returns</li>
              </ul>
            </div>

            {/* Column 4 - Company */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
              <ul className="space-y-2">
                <li className="hover:text-blue-500 cursor-pointer">About Us</li>
                <li className="hover:text-blue-500 cursor-pointer">Careers</li>
                <li className="hover:text-blue-500 cursor-pointer">Sell on Fintech</li>
                <li className="hover:text-blue-500 cursor-pointer">Press & News</li>
              </ul>
            </div>

            {/* Column 5 - Policy */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Policy</h4>
              <ul className="space-y-2">
                <li className="hover:text-blue-500 cursor-pointer">Returns Policy</li>
                <li className="hover:text-blue-500 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-blue-500 cursor-pointer">Terms & Conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Blue Background */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-1 flex flex-wrap justify-between items-center">
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
