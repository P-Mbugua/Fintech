import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
          {/* Column 1 - Shop */}
          <div>
            <h4 className="font-semibold mb-3">Shop</h4>
            <ul className="space-y-2">
              <li>Daily Deals</li>
              <li>App Only Deals</li>
              <li>Clearance Sale</li>
              <li>Gift Vouchers</li>
            </ul>
          </div>

          {/* Column 2 - Account */}
          <div>
            <h4 className="font-semibold mb-3">Account</h4>
            <ul className="space-y-2">
              <li>My Account</li>
              <li>Track Order</li>
              <li>Returns</li>
              <li>Invoices</li>
            </ul>
          </div>

          {/* Column 3 - Help */}
          <div>
            <h4 className="font-semibold mb-3">Help</h4>
            <ul className="space-y-2">
              <li>Help Centre</li>
              <li>Contact Us</li>
              <li>Shipping & Delivery</li>
              <li>Returns</li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Careers</li>
              <li>Sell on MbuguaPeter</li>
              <li>Press & News</li>
            </ul>
          </div>

          {/* Column 5 - Policy */}
          <div>
            <h4 className="font-semibold mb-3">Policy</h4>
            <ul className="space-y-2">
              <li>Returns Policy</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-wrap justify-between items-center mt-10">
          {/* App Download Buttons */}
          <div>
            <h4 className="font-semibold mb-2">Download Our Apps</h4>
            <div className="flex space-x-3">
              <img src="/appstore.png" alt="App Store" className="h-10" />
              <img src="/googleplay.png" alt="Google Play" className="h-10" />
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <FaFacebookF className="text-gray-600 text-xl cursor-pointer" />
              <FaTwitter className="text-gray-600 text-xl cursor-pointer" />
              <FaInstagram className="text-gray-600 text-xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section with Blue Background */}
      <div className="bg-blue-700 text-white py-6 mt-10">
        <div className="container mx-auto text-center text-sm">
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
