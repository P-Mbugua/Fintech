import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/">BrandName</Link>
        </h1>

        {/* Large Screen Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-700 p-4 space-y-2">
          <Link to="/" className="block hover:underline">Home</Link>
          <Link to="/cart" className="block hover:underline">Cart</Link>
          <Link to="/profile" className="block hover:underline">Profile</Link>
          <Link to="/dashboard" className="block hover:underline">Dashboard</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
