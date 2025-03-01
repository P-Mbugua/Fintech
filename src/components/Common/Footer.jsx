import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaCcVisa, FaCcMastercard, FaPaypal, FaGooglePlay, FaApple } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-12">
      <div className="container mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Shop</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">Daily Deals</li>
              <li className="hover:text-blue-600 cursor-pointer">App Only Deals</li>
              <li className="hover:text-blue-600 cursor-pointer">Clearance Sale</li>
              <li className="hover:text-blue-600 cursor-pointer">Gift Vouchers</li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Account</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">My Account</li>
              <li className="hover:text-blue-600 cursor-pointer">Track Order</li>
              <li className="hover:text-blue-600 cursor-pointer">Returns</li>
              <li className="hover:text-blue-600 cursor-pointer">Invoices</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Help</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">Help Centre</li>
              <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-600 cursor-pointer">Shipping & Delivery</li>
              <li className="hover:text-blue-600 cursor-pointer">Returns</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">About Us</li>
              <li className="hover:text-blue-600 cursor-pointer">Careers</li>
              <li className="hover:text-blue-600 cursor-pointer">Sell on MbuguaPeter</li>
              <li className="hover:text-blue-600 cursor-pointer">Press & News</li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Policy</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">Returns Policy</li>
              <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-blue-600 cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-wrap justify-between items-center mt-12">
          {/* Download App */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Download Our App</h4>
            <div className="flex space-x-6 text-4xl">
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <FaApple className="cursor-pointer hover:text-black transition duration-300" />
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <FaGooglePlay className="cursor-pointer hover:text-green-600 transition duration-300" />
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Follow Us</h4>
            <div className="flex space-x-4 text-2xl">
              <FaFacebookF className="cursor-pointer hover:text-blue-600 transition duration-300" />
              <FaTwitter className="cursor-pointer hover:text-blue-400 transition duration-300" />
              <FaInstagram className="cursor-pointer hover:text-pink-600 transition duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#004aad] text-white mt-8 py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MbuguaPeter. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-3 text-3xl">
            <FaCcVisa className="cursor-pointer hover:text-gray-300 transition duration-300" />
            <FaCcMastercard className="cursor-pointer hover:text-gray-300 transition duration-300" />
            <FaPaypal className="cursor-pointer hover:text-gray-300 transition duration-300" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
