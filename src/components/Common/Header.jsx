import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LayoutDashboard, CreditCard, LogOut } from "lucide-react"; // Icons

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/">FintechApp</Link>
        </h1>

        {/* Large Screen Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="flex items-center gap-2 hover:underline">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/cart" className="flex items-center gap-2 hover:underline">
            <ShoppingCart size={20} /> Cart
          </Link>
          <Link to="/transactions" className="flex items-center gap-2 hover:underline">
            <CreditCard size={20} /> Transactions
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:underline">
            <User size={20} /> Profile
          </Link>
          <button className="flex items-center gap-2 hover:underline">
            <LogOut size={20} /> Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-700 p-4 space-y-3">
          <Link to="/" className="flex items-center gap-2 block hover:underline">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/cart" className="flex items-center gap-2 block hover:underline">
            <ShoppingCart size={20} /> Cart
          </Link>
          <Link to="/transactions" className="flex items-center gap-2 block hover:underline">
            <CreditCard size={20} /> Transactions
          </Link>
          <Link to="/profile" className="flex items-center gap-2 block hover:underline">
            <User size={20} /> Profile
          </Link>
          <button className="flex items-center gap-2 block hover:underline">
            <LogOut size={20} /> Logout
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
