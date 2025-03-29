import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  ShoppingCart, Heart, ChevronDown, UserCheck, UserRoundPlus, Menu, X, LogOut
} from "lucide-react";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on page load
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 text-4xl font-bold">
            <a href="/" className="flex items-center gap-1 text-gray-800">
              <span className="font-bold text-4xl">Fintech</span>
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-extrabold">
                com
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-gray-700 text-sm ">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="flex items-center gap-1 hover:text-blue-600">
                  <UserCheck size={18} /> Login
                </Link>
                <div className="w-px h-6 bg-gray-200"></div>
                <Link to="/register" className="flex items-center gap-1 hover:text-blue-600">
                  <UserRoundPlus size={18} /> Register
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="flex items-center gap-1 text-red-600">
                <LogOut size={18} /> Logout
              </button>
            )}

            <div className="w-px h-6 bg-gray-200"></div>
            <Link to="/orders" className="hover:text-blue-600">Orders</Link>
            <div className="w-px h-6 bg-gray-200"></div>

            {/* Wishlist & Cart */}
            <a href="/wishlist" className="relative hover:text-red-500">
              <Heart size={20} className="text-red-500" />
            </a>
            <a href="/cart" className="relative flex items-center bg-green-500 text-white px-2 py-1 rounded-full">
              <ShoppingCart size={20} />
              <span className="ml-1">0</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md p-4 space-y-4 font-sans">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="flex items-center gap-2 text-gray-700 pb-2 border-b border-gray-200">
                  <UserCheck size={18} /> Login
                </Link>
                <Link to="/register" className="flex items-center gap-2 text-gray-700 pb-2 border-b border-gray-200">
                  <UserRoundPlus size={18} /> Register
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 pb-2 border-b border-gray-200">
                <LogOut size={18} /> Logout
              </button>
            )}

            <Link to="/orders" className="block text-gray-700 pb-2 border-b border-gray-200">Orders</Link>
            <Link to="/profile" className="block text-gray-700 pb-2 border-b border-gray-200">My Account</Link>
          </div>
        )}
      </header>

      {/* Toastify Notifications */}
      <div className="pt-15"></div>
    </>
  );
}

export default Header;
