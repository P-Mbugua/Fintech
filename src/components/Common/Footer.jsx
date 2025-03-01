import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          {/* Column 1 - Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">Daily Deals</li>
              <li className="hover:text-blue-500 cursor-pointer">App Only Deals</li>
              <li className="hover:text-blue-500 cursor-pointer">Clearance Sale</li>
              <li className="hover:text-blue-500 cursor-pointer">Gift Vouchers</li>
            </ul>
          </div>

          {/* Column 2 - Account */}
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">My Account</li>
              <li className="hover:text-blue-500 cursor-pointer">Track Order</li>
              <li className="hover:text-blue-500 cursor-pointer">Returns</li>
              <li className="hover:text-blue-500 cursor-pointer">Invoices</li>
            </ul>
          </div>

          {/* Column 3 - Help */}
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">Help Centre</li>
              <li className="hover:text-blue-500 cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-500 cursor-pointer">Shipping & Delivery</li>
              <li className="hover:text-blue-500 cursor-pointer">Returns</li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">About Us</li>
              <li className="hover:text-blue-500 cursor-pointer">Careers</li>
              <li className="hover:text-blue-500 cursor-pointer">Sell on MbuguaPeter</li>
              <li className="hover:text-blue-500 cursor-pointer">Press & News</li>
            </ul>
          </div>

          {/* Column 5 - Policy */}
          <div>
            <h4 className="font-semibold mb-4">Policy</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">Returns Policy</li>
              <li className="hover:text-blue-500 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-blue-500 cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-wrap justify-between items-center mt-12">
          {/* App Download Buttons */}
          <div>
            <h4 className="font-semibold mb-3">Download Our Apps</h4>
            <div className="flex space-x-3">
              <img src="/appstore.png" alt="App Store" className="h-10" />
              <img src="/googleplay.png" alt="Google Play" className="h-10" />
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <FaFacebookF className="text-gray-600 text-xl cursor-pointer hover:text-blue-500" />
              <FaTwitter className="text-gray-600 text-xl cursor-pointer hover:text-blue-400" />
              <FaInstagram className="text-gray-600 text-xl cursor-pointer hover:text-pink-500" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MbuguaPeter. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-3">
            <img src="/visa.png" alt="Visa" className="h-6" />
            <img src="/mastercard.png" alt="MasterCard" className="h-6" />
            <img src="/paypal.png" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
