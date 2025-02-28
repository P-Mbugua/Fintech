import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, X, ShoppingCart, User, LayoutDashboard, CreditCard, LogOut 
} from "lucide-react"; // Icons for better UI

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Logout (You can replace this with actual logout logic)
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-gray-200 transition">FintechApp</Link>
        </h1>

        {/* Large Screen Navigation */}
        <nav className="hidden md:flex space-x-6 items-center text-lg font-medium">
          <Link to="/" className="flex items-center gap-2 hover:text-gray-200 transition">
            <LayoutDashboard size={22} /> Dashboard
          </Link>
          <Link to="/cart" className="flex items-center gap-2 hover:text-gray-200 transition">
            <ShoppingCart size={22} /> Cart
          </Link>
          <Link to="/transactions" className="flex items-center gap-2 hover:text-gray-200 transition">
            <CreditCard size={22} /> Transactions
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:text-gray-200 transition">
            <User size={22} /> Profile
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-300 transition">
            <LogOut size={22} /> Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu (Animated Dropdown) */}
      <div className={`absolute top-0 left-0 w-full bg-blue-700 transition-transform duration-300 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"} md:hidden`}>
        <nav className="flex flex-col items-center space-y-4 p-6 text-lg font-medium">
          <Link to="/" className="flex items-center gap-2 hover:text-gray-300 transition">
            <LayoutDashboard size={24} /> Dashboard
          </Link>
          <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 transition">
            <ShoppingCart size={24} /> Cart
          </Link>
          <Link to="/transactions" className="flex items-center gap-2 hover:text-gray-300 transition">
            <CreditCard size={24} /> Transactions
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:text-gray-300 transition">
            <User size={24} /> Profile
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-300 hover:text-red-500 transition">
            <LogOut size={24} /> Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
