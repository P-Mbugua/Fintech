import { Client, Account, Databases, Query } from "appwrite";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  ShoppingCart, Heart, UserCheck, UserRoundPlus, Menu, X, LogOut, User
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

// Appwrite setup
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

const databaseId = "67e83c7d003109ed269c";
const collectionId = "67e84557002bec656b65";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [userName, setUserName] = useState("My Account");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await account.get(); 
        const email = userData.email;

        const response = await databases.listDocuments(databaseId, collectionId, [
          Query.equal("email", email) 
        ]);

        if (response.documents.length > 0) {
          setUserName(response.documents[0].name); 
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    if (user) {
      fetchUserName();
    }
  }, [user]);

  // Handle Logout
  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 text-4xl font-bold">
            <Link to="/" className="flex items-center gap-1 text-gray-800">
              <span className="font-bold text-4xl">Fintech</span>
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-extrabold">
                com
              </span>
            </Link>


            
          <div className="flex text-sm font-semibold pl-10 space-x-4">
                <Link to="/orders" className="block text-gray-700">Help Centre</Link>
                <div className="w-px h-6 bg-gray-200"></div>
                <Link to="/orders" className="block text-gray-700 ">Sell on Fintech</Link>
          </div>
          </div>

          

          {/* Desktop Navigation */}
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
                <button onClick={handleLogout} className="flex items-center gap-1 text-red-600 hover:text-red-800 cursor-pointer">
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}

            <div className="w-px h-6 bg-gray-200"></div>
            <Link to="/orders" className="hover:text-blue-600">Orders</Link>
            <div className="w-px h-6 bg-gray-200"></div>

            <Link to="/profile" className="flex items-center gap-1 hover:text-blue-600">
              <User size={18} /> {user ? userName : "My Account"}
            </Link>

            {/* Wishlist & Cart */}
            <Link to="/wishlist" className="relative hover:text-red-500">
              <Heart size={20} className="text-red-500" />
            </Link>
            <Link to="/cart" className="relative flex items-center bg-green-500 text-white px-2 py-1 rounded-full">
              <ShoppingCart size={20} />
              <span className="ml-1">0</span>
            </Link>
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

            <Link to="/cart" className="block text-gray-700 pb-2 border-b border-gray-200">Cart</Link>
            <Link to="/wishlist" className="block text-gray-700 pb-2 border-b border-gray-200">Wishlist</Link>
            <Link to="/orders" className="block text-gray-700 pb-2 border-b border-gray-200">Orders</Link>
          </div>
        )}
      </header>

      {/* Toastify Notifications */}
      <div className="pt-15"></div>
    </>
  );
}

export default Header;
