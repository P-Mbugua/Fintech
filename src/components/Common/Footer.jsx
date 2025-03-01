import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative bg-[#F5F5F5] text-[#333] py-12 overflow-hidden">
      {/* Background Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#E0E0E0] to-[#F5F5F5] opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          {/** Column Items */}
          {[
            { title: "Shop", links: ["Daily Deals", "App Only Deals", "Clearance Sale", "Gift Vouchers"] },
            { title: "Account", links: ["My Account", "Track Order", "Returns", "Invoices"] },
            { title: "Help", links: ["Help Centre", "Contact Us", "Shipping & Delivery", "Returns"] },
            { title: "Company", links: ["About Us", "Careers", "Sell on MbuguaPeter", "Press & News"] },
            { title: "Policy", links: ["Returns Policy", "Privacy Policy", "Terms & Conditions"] },
          ].map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-[#222] relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-[#007BFF] after:mt-1">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link, i) => (
                  <li key={i} className="hover:text-[#007BFF] cursor-pointer transition-colors duration-200">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle Section */}
        <div className="flex flex-wrap justify-between items-center mt-12">
          {/* App Download Buttons */}
          <div>
            <h4 className="font-semibold mb-3 text-[#222]">Download Our Apps</h4>
            <div className="flex space-x-3">
              <button className="bg-[#007BFF] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#0056b3]">
                <span className="font-medium">App Store</span>
              </button>
              <button className="bg-[#28A745] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#218838]">
                <span className="font-medium">Google Play</span>
              </button>
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
        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm bg-[#007BFF] text-white py-6 rounded-t-lg">
          <p>&copy; {new Date().getFullYear()} MbuguaPeter. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-3">
            <FaCcVisa className="text-3xl" />
            <FaCcMastercard className="text-3xl" />
            <FaCcPaypal className="text-3xl" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
