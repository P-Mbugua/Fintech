import { Client, Account, Databases, Query } from "appwrite";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ShoppingCart, Heart, UserCheck, UserRoundPlus,
  Menu, X, LogOut, User
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

// Appwrite setup
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

const databaseId = "67e83c7d003109ed269c";
const userCollectionId = "67e84557002bec656b65";
const cartCollectionId = "67eade1800187dbb6aad"; 

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("My Account");
  const [cartCount, setCartCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const userData = await account.get();
  
      // 1. Get user name
      const nameResponse = await databases.listDocuments(databaseId, userCollectionId, [
        Query.equal("email", userData.email)
      ]);
      if (nameResponse.documents.length > 0) {
        setUserName(nameResponse.documents[0].name);
      }
  
      // 2. Get cart count (replace 'userId' with the actual attribute name used in your cart collection)
      const cartResponse = await databases.listDocuments(databaseId, cartCollectionId, [
        Query.equal("userId", userData.$id)
      ]);
      setCartCount(cartResponse.documents.length);
  
    } catch (error) {
      console.error("Error fetching user or cart info:", error);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm border-b">

              <div className="container mx-auto flex justify-between items-center p-4">
                    
                    {/* Left Section: Logo + Links */}
                    <div className="flex items-center space-x-8 font-bold">
                            {/* Logo */}
                            <Link to="/" className="flex items-center gap-1 text-gray-800 text-4xl">
                              Fintech{" "}
                              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-extrabold align-middle">
                                com
                              </span>
                            </Link>

                            {/* Help & Sell Links */}
                            <div className="flex items-center space-x-4 text-sm font-semibold text-gray-700">
                              <Link to="/help" className="hover:text-blue-600">Help Centre</Link>
                              <div className="w-px h-6 bg-gray-300"></div>
                              <Link to="/sell" className="hover:text-blue-600">Sell on Fintech</Link>
                            </div>
                    </div>

                    {/* Right Section: Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6 text-gray-700 text-sm">
                      {!user ? (
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
                        <>
                          {/* Cart */}
                          <Link to="/cart" className="relative flex items-center text-gray-700 hover:text-blue-600">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                {cartCount}
                              </span>
                            )}
                          </Link>

                          <div className="w-px h-6 bg-gray-200"></div>

                          {/* Wishlist */}
                          <Link to="/wishlist" className="relative hover:text-red-500">
                            <Heart size={20} className="text-red-500" />
                          </Link>

                          <div className="w-px h-6 bg-gray-200"></div>

                          {/* Orders */}
                          <Link to="/orders" className="hover:text-blue-600">Orders</Link>

                          <div className="w-px h-6 bg-gray-200"></div>

                          {/* Account */}
                          <Link to="/profile" className="flex items-center gap-1 hover:text-blue-600">
                            <User size={18} /> {user ? userName : "My Account"}
                          </Link>

                          <div className="w-px h-6 bg-gray-200"></div>

                          {/* Logout (last) */}
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-1 text-red-600 hover:text-red-800 cursor-pointer"
                          >
                            <LogOut size={18} /> Logout
                          </button>
                        </>
                      )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                  </div>

                  {/* Mobile Dropdown Menu */}
                  {mobileMenuOpen && (
                    <div className="md:hidden bg-white shadow-md p-4 space-y-4 font-sans">
                      {!user ? (
                        <>
                          <Link to="/login" className="flex items-center gap-2 text-gray-700 pb-2 border-b border-gray-200">
                            <UserCheck size={18} /> Login
                          </Link>
                          <Link to="/register" className="flex items-center gap-2 text-gray-700 pb-2 border-b border-gray-200">
                            <UserRoundPlus size={18} /> Register
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/cart" className="block text-gray-700 pb-2 border-b border-gray-200">
                            <ShoppingCart size={18} className="inline mr-1" /> Cart ({cartCount})
                          </Link>
                          <Link to="/wishlist" className="block text-gray-700 pb-2 border-b border-gray-200">
                            <Heart size={18} className="inline mr-1 text-red-500" /> Wishlist
                          </Link>
                          <Link to="/orders" className="block text-gray-700 pb-2 border-b border-gray-200">
                            Orders
                          </Link>
                          <Link to="/profile" className="flex items-center gap-2 text-gray-700 pb-2 border-b border-gray-200 cursor-pointer">
                            <User size={18} /> {user ? userName : "Account"}
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-600 pb-2 border-b border-gray-200 cursor-pointer"
                          >
                            <LogOut size={18} /> Logout
                          </button>
                        </>
                      )}
                    </div>
                  )}
      </header>

      {/* Toastify Notifications */}
      <div className="pt-15"></div>
    </>
  );
}

export default Header;
