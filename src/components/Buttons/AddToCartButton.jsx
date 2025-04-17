import React, { useState } from "react";
import { useCart } from "../../Context/CartContext";
import { Client, Account, Databases, ID } from "appwrite";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

// Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      // Get logged-in user details
      const user = await account.get();
      if (!user) throw new Error("User not logged in");

      // Prepare product data for database
      const quantity = 1;
      const price01 = product.price;
      const total01 = price01 * quantity;
      const createdAt01 = Math.floor(Date.now() / 1000);

      const productData = {
        userId: user.$id,
        productId: String(product.id),
        quantity,
        price01,
        total01,
        createdAt01,
        image: product.image, // Include the product image here
      };

      // Save to Appwrite Database
      const response = await databases.createDocument(
        "67e83c7d003109ed269c",
        "67eade1800187dbb6aad",
        ID.unique(),
        productData
      );

      console.log("Product added to database:", response);
      
      // Show success toast
      toast.success("Added to cart successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      addToCart(product); // Update local cart

    } catch (error) {
      console.error("Error adding to cart:", error.message);

      // Show error toast
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={`px-6 py-3 text-white rounded-lg shadow-md transition duration-300 ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </>
  );
}

export default AddToCartButton;
