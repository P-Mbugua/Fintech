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
const cartCollectionId = "67eade1800187dbb6aad"; // Replace with actual cart collection ID

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
        <header className="fixed top-0 z-50 w-full border-b border-gray-300 bg-gray-100">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 text-4xl font-bold">           

          {/* SokoPoa brand symbol */}
                   <Link
                  to="/"
                  className="inline-flex items-center gap-1 text-gray-900"
                  >
                  {/* Wordmark */}
                  <span className="font-sans text-[14px] sm:text-[14px] md:text-[16px] font-extrabold tracking-[0.09em] leading-none">
                       SOKOPOA
                  </span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 12V9.5C10 6.5 12.4 4.5 16 4.5C19.6 4.5 22 6.5 22 9.5V12"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 11H25L27 26H5L7 11Z"
                        fill="white"
                      />
                      <path
                        d="M11 18C11 16.7 12.1 15.8 13.5 15.8H18.5C19.9 15.8 21 16.7 21 18C21 19.3 19.9 20.2 18.5 20.2H13.5C12.1 20.2 11 21.1 11 22.4"
                        stroke="#2563EB"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </Link>



            <div className="flex text-sm font-semibold pl-10 space-x-4 lg:flex hidden">
              <Link to="/orders" className="block text-gray-700">Help Centre</Link>
              <div className="w-px h-6 bg-gray-200"></div>
              <Link to="/orders" className="block text-gray-700">Sell on SokoPoa</Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-gray-700 text-sm">
            


            <Link to="/profile" className="flex items-center gap-1 hover:text-blue-600">
              <User size={18} /> {user ? userName : "My Account"}
            </Link>


            <div className="w-px h-6 bg-gray-200"></div>
            <Link to="/orders" className="hover:text-blue-600">Orders</Link>
            <div className="w-px h-6 bg-gray-200"></div>


            <Link to="/cart" className="relative flex items-center text-gray-700 hover:text-blue-600">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            
             <div className="w-px h-6 bg-gray-200"></div>

            {/* Wishlist & Cart */}
            <Link to="/wishlist" className="relative hover:text-red-500">
              <Heart size={20} className="text-red-500" />
            </Link>


             <div className="w-px h-6 bg-gray-200"></div>


            

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
                <button onClick={handleLogout} className="flex items-center gap-1 text-red-600 hover:text-red-800 cursor-pointer">
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
                <Link to="/profile" className="flex items-center gap-2 text-gray-700 pb-2 border-b border-gray-200 cursor-pointer">
                  <User size={18} /> {user ? userName : "Profile"}
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 pb-2 border-b border-gray-200 cursor-pointer">
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}

            {/* <Link to="/cart" className="block text-gray-700 pb-2 border-b border-gray-200">
              Cart ({cartCount})
            </Link>
            <Link to="/wishlist" className="block text-gray-700 pb-2 border-b border-gray-200">Wishlist</Link>
            <Link to="/orders" className="block text-gray-700 pb-2 border-b border-gray-200">Orders</Link> */}

          </div>
        )}
      </header>

      {/* Toastify Notifications */}
      <div className="pt-15"></div>
    </>
  );
}

export default Header;
