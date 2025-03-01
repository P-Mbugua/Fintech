import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Search } from "lucide-react";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left: Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center: Logo */}
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <span className="text-gray-800">takealot</span>
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-bold">com</span>
        </div>

        {/* Right: Search & Cart */}
        <div className="flex items-center space-x-4">
          <Search size={22} className="text-gray-700" />
          <ShoppingCart size={24} className="text-gray-700" />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          <Link to="/login" className="block text-gray-700">Login</Link>
          <Link to="/register" className="block text-gray-700">Register</Link>
          <Link to="/orders" className="block text-gray-700">Orders</Link>
          <Link to="/profile" className="block text-gray-700">My Account</Link>
          <Link to="/logout" className="block text-gray-700">Logout</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
