import { Client, Account, Databases, Query } from "appwrite";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ShoppingCart,
  Heart,
  UserCheck,
  UserRoundPlus,
  LogOut,
  User,
  Package,
  Home,
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("My Account");
  const [cartCount, setCartCount] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  // Fetch user details + cart count
  const fetchUserDetails = async () => {
    try {
      const userData = await account.get();
      console.log("Session valid:", userData);

      setUserEmail(userData.email);

      const nameResponse = await databases.listDocuments(
        databaseId,
        userCollectionId,
        [Query.equal("email", userData.email)]
      );

      if (nameResponse.documents.length > 0) {
        setUserName(nameResponse.documents[0].name);
      } else {
        // fallback to email if no name found
        setUserName(userData.name || userData.email.split("@")[0]);
      }

      const cartResponse = await databases.listDocuments(
        databaseId,
        cartCollectionId,
        [Query.equal("userId", userData.$id)]
      );

      setCartCount(cartResponse.documents.length);
    } catch (error) {
      console.error("Error fetching user or cart info:", error);
    }
  };

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
      {/* Main Header */}
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo - visible on desktop only */}
          <div className="hidden md:flex items-center space-x-8 font-bold">
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-800 text-base sm:text-lg md:text-lg font-extrabold font-sans"
            >
              Fintech{" "}
              <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold align-middle">
                com
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-4 text-sm font-semibold text-gray-700">
              <Link to="/help" className="hover:text-blue-600">
                Help Centre
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <Link to="/sell" className="hover:text-blue-600">
                Sell on Fintech
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-gray-700 text-sm">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <UserCheck size={18} /> Login
                </Link>
                <div className="w-px h-6 bg-gray-200"></div>
                <Link
                  to="/register"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <UserRoundPlus size={18} /> Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/cart"
                  className="relative flex items-center text-gray-700 hover:text-blue-600"
                >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="w-px h-6 bg-gray-200"></div>

                <Link
                  to="/wishlist"
                  className="relative hover:text-red-500"
                >
                  <Heart size={20} className="text-red-500" />
                </Link>
                <div className="w-px h-6 bg-gray-200"></div>

                <Link
                  to="/orders"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <Package size={18} /> Orders
                </Link>
                <div className="w-px h-6 bg-gray-200"></div>

                <Link
                  to="/profile"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <User size={18} /> {userName}
                </Link>
                <div className="w-px h-6 bg-gray-200"></div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>



                {/* ✅ Mobile Sticky Nav (Visible on mobile and above all content) */}
                <nav className="sticky top-0 md:hidden w-full bg-gray-800 text-white z-[999] border-b border-gray-700">
                  <div className="flex justify-around items-center py-2 text-xs">
                    <Link
                      to="/"
                      className="flex flex-col items-center justify-center hover:text-blue-400"
                    >
                      <Home size={20} />
                      <span>Home</span>
                    </Link>

                    <Link
                      to="/cart"
                      className="flex flex-col items-center justify-center relative hover:text-blue-400"
                    >
                      <ShoppingCart size={20} />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold px-1 py-[1px] rounded-full">
                          {cartCount}
                        </span>
                      )}
                      <span>Cart</span>
                    </Link>

                    <Link
                      to="/wishlist"
                      className="flex flex-col items-center justify-center hover:text-blue-400"
                    >
                      <Heart size={20} />
                      <span>Wishlist</span>
                    </Link>

                    {!user ? (
                      <>
                        <Link
                          to="/login"
                          className="flex flex-col items-center justify-center hover:text-blue-400"
                        >
                          <UserCheck size={20} />
                          <span>Login</span>
                        </Link>

                        <Link
                          to="/register"
                          className="flex flex-col items-center justify-center hover:text-blue-400"
                        >
                          <UserRoundPlus size={20} />
                          <span>Register</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          className="flex flex-col items-center justify-center hover:text-blue-400"
                        >
                          <User size={20} />
                          <span>{userName}</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex flex-col items-center justify-center text-red-500 hover:text-red-700"
                        >
                          <LogOut size={20} />
                          <span>Logout</span>
                        </button>
                      </>
                    )}
                  </div>
                </nav>


      

      {/* Spacer for mobile so content below doesn’t overlap */}
      <div className="md:hidden h-16"></div>
    </>
  );
}

export default Header;
