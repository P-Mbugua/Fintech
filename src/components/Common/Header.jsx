import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu } from "lucide-react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Mobile Menu Icon - Visible only on small screens */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={26} />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <span className="text-gray-700 font-semibold">takealot</span>
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-bold">com</span>
        </div>

        {/* Right - Search & Cart Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-blue-600">
            <Search size={22} />
          </button>
          <button className="relative text-gray-700 hover:text-blue-600">
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs px-1 rounded-full">0</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Only appears on small screens) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          <nav className="flex flex-col space-y-4 text-gray-700">
            <Link to="#" className="hover:text-blue-600">Help Centre</Link>
            <Link to="#" className="hover:text-blue-600">Sell on Takealot</Link>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
            <Link to="/register" className="hover:text-blue-600">Register</Link>
            <Link to="/orders" className="hover:text-blue-600">Orders</Link>
          </nav>
        </div>
      )}

      {/* Large Screen Navigation - Hidden on small screens */}
      <nav className="hidden md:flex justify-center space-x-6 p-2 bg-gray-100">
        <Link to="#" className="hover:text-blue-600">Home</Link>
        <Link to="#" className="hover:text-blue-600">Shop</Link>
        <Link to="#" className="hover:text-blue-600">Deals</Link>
        <Link to="#" className="hover:text-blue-600">Categories</Link>
        <Link to="#" className="hover:text-blue-600">Account</Link>
      </nav>
    </header>
  );
}

export default Header;
