import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#F5F5F5] text-[#333] pt-12">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          {/* Column 1 - Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222]">Shop</h4>
            <ul className="space-y-2">
              {["Daily Deals", "App Only Deals", "Clearance Sale", "Gift Vouchers"].map((item, index) => (
                <li key={index} className="hover:text-blue-500 cursor-pointer transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Account */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222]">Account</h4>
            <ul className="space-y-2">
              {["My Account", "Track Order", "Returns", "Invoices"].map((item, index) => (
                <li key={index} className="hover:text-blue-500 cursor-pointer transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Help */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222]">Help</h4>
            <ul className="space-y-2">
              {["Help Centre", "Contact Us", "Shipping & Delivery", "Returns"].map((item, index) => (
                <li key={index} className="hover:text-blue-500 cursor-pointer transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222]">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Sell on MbuguaPeter", "Press & News"].map((item, index) => (
                <li key={index} className="hover:text-blue-500 cursor-pointer transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 - Policy */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222]">Policy</h4>
            <ul className="space-y-2">
              {["Returns Policy", "Privacy Policy", "Terms & Conditions"].map((item, index) => (
                <li key={index} className="hover:text-blue-500 cursor-pointer transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-wrap justify-between items-center mt-12">
          {/* App Download Buttons */}
          <div>
            <h4 className="font-semibold mb-3 text-[#222]">Download Our Apps</h4>
            <div className="flex space-x-3">
              <img src="/appstore.png" alt="App Store" className="h-10 cursor-pointer" />
              <img src="/googleplay.png" alt="Google Play" className="h-10 cursor-pointer" />
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="font-semibold mb-3 text-[#222]">Follow Us</h4>
            <div className="flex space-x-4">
              <FaFacebookF className="text-[#333] text-xl cursor-pointer hover:text-blue-600 transition" />
              <FaTwitter className="text-[#333] text-xl cursor-pointer hover:text-[#1DA1F2] transition" />
              <FaInstagram className="text-[#333] text-xl cursor-pointer hover:text-[#E1306C] transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section with Blue Background */}
      <div className="bg-blue-900 text-white mt-8 pt-6 pb-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} MbuguaPeter. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-3">
          <img src="/visa.png" alt="Visa" className="h-6 opacity-80 hover:opacity-100 transition" />
          <img src="/mastercard.png" alt="MasterCard" className="h-6 opacity-80 hover:opacity-100 transition" />
          <img src="/paypal.png" alt="PayPal" className="h-6 opacity-80 hover:opacity-100 transition" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
