import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, Databases, ID, Account } from 'appwrite';

// Initialize Appwrite
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const databases = new Databases(client);
const account = new Account(client);

const WISHLIST_DB = "database-67e83c7d003109ed269c";
const WISHLIST_COLLECTION = "wishlist";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const user = await account.get();
      setUserId(user.$id);
    } catch (err) {
      console.log("User not logged in");
    }
  };

 
  const fetchWishlist = async () => {
    if (!userId) return;
    try {
      const res = await databases.listDocuments(WISHLIST_DB, WISHLIST_COLLECTION, [
        { key: "userId", value: userId }
      ]);
      setWishlist(res.documents);
    } catch (err) {
      console.error("Fetch wishlist failed:", err);
    }
  };

  // Add item to wishlist
  const addToWishlist = async (product) => {
    if (!userId) return alert("Please login first");
    const exists = wishlist.find(item => item.productId === product.id.toString());
    if (exists) return alert(`${product.name} is already in your wishlist`);

    const doc = {
      userId,
      productId: product.id.toString(),
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      discount: product.discount.toString(),
      image: product.image,
      rating: product.rating || 0,
      stock: product.stock?.toString() || "N/A",
      createdAt: new Date().toISOString()
    };

    try {
      const res = await databases.createDocument(WISHLIST_DB, WISHLIST_COLLECTION, ID.unique(), doc);
      setWishlist(prev => [...prev, res]);
      alert(`${product.name} added to wishlist!`);
    } catch (err) {
      console.error("Add to wishlist failed:", err);
      alert("Failed to add product");
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (id) => {
    try {
      await databases.deleteDocument(WISHLIST_DB, WISHLIST_COLLECTION, id);
      setWishlist(prev => prev.filter(item => item.$id !== id));
    } catch (err) {
      console.error("Remove wishlist failed:", err);
      alert("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        fetchWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
