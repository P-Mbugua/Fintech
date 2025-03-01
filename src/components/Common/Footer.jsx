import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#F5F5F5] text-[#333] py-12">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          {/* Column 1 - Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222]">Shop</h4>
            <ul className="space-y-2">
              <li className="hover:text-[#007BFF] cursor-pointer">Daily Deals</li>
              <li className="hover:text-[#007BFF] cursor-pointer">App Only Deals</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Clearance Sale</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Gift Vouchers</li>
            </ul>
          </div>

          {/* Column 2 - Account */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222]">Account</h4>
            <ul className="space-y-2">
              <li className="hover:text-[#007BFF] cursor-pointer">My Account</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Track Order</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Returns</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Invoices</li>
            </ul>
          </div>

          {/* Column 3 - Help */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222]">Help</h4>
            <ul className="space-y-2">
              <li className="hover:text-[#007BFF] cursor-pointer">Help Centre</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Contact Us</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Shipping & Delivery</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Returns</li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222]">Company</h4>
            <ul className="space-y-2">
              <li className="hover:text-[#007BFF] cursor-pointer">About Us</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Careers</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Sell on MbuguaPeter</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Press & News</li>
            </ul>
          </div>

          {/* Column 5 - Policy */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222]">Policy</h4>
            <ul className="space-y-2">
              <li className="hover:text-[#007BFF] cursor-pointer">Returns Policy</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Privacy Policy</li>
              <li className="hover:text-[#007BFF] cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-wrap justify-between items-center mt-12">
          {/* App Download Buttons */}
          <div>
            <h4 className="font-semibold mb-3 text-[#222]">Download Our Apps</h4>
            <div className="flex space-x-3">
              <img src="/appstore.png" alt="App Store" className="h-10" />
              <img src="/googleplay.png" alt="Google Play" className="h-10" />
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="font-semibold mb-3 text-[#222]">Follow Us</h4>
            <div className="flex space-x-4">
              <FaFacebookF className="text-[#333] text-xl cursor-pointer hover:text-[#007BFF]" />
              <FaTwitter className="text-[#333] text-xl cursor-pointer hover:text-[#1DA1F2]" />
              <FaInstagram className="text-[#333] text-xl cursor-pointer hover:text-[#E1306C]" />
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
