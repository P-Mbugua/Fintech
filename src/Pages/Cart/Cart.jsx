import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext"; // Ensure correct path
import { Client, Account, Databases, Query } from "appwrite";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your endpoint
  .setProject("67e83a4b001b39dcc0dc"); // Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);

function Cart() {
  const { cart, setCart } = useCart(); // Ensure useCart is correctly providing setCart
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = await account.get();
        if (!user) throw new Error("User not logged in");

        // Fetch the cart items from the Appwrite database
        const response = await databases.listDocuments(
          "67e83c7d003109ed269c", // Replace with your database ID
          "67eade1800187dbb6aad", // Replace with your collection ID
          [
            Query.equal("userId", user.$id), // Fetch cart items for the logged-in user
          ]
        );

        console.log("Fetched cart items:", response); // Debugging

        // Update the cart context with the fetched data
        setCart(response.documents); // This should be working now

      } catch (error) {
        console.error("Error fetching cart:", error.message);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchCart();
  }, [setCart]); // Only run this effect once when the component mounts

  // Function to increase quantity
  const increaseQuantity = (itemId) => {
    // Update cart locally
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 }; // Increase quantity of the selected item
        }
        return item;
      });
    });

    // Update the database
    updateDatabase(itemId, "increase");
  };

  // Function to decrease quantity
  const decreaseQuantity = (itemId) => {
    // Update cart locally
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === itemId) {
          if (item.quantity === 1) {
            return null; // Set to null if quantity reaches 1
          } else {
            return { ...item, quantity: item.quantity - 1 }; // Decrease quantity
          }
        }
        return item;
      }).filter(item => item !== null); // Remove the deleted item
    });

    // Update the database
    updateDatabase(itemId, "decrease");
  };

  // Function to update the database when cart changes
  const updateDatabase = async (itemId, action) => {
    try {
      const user = await account.get();
      if (!user) throw new Error("User not logged in");

      const cartItem = cart.find((item) => item.id === itemId); // Find the targeted cart item
      if (!cartItem) return; // If no item is found, do nothing

      const documentId = cartItem.$id; // Get the document ID from the cart item

      // Update the quantity in the database
      if (action === "increase") {
        await databases.updateDocument(
          "67e83c7d003109ed269c", // Replace with your database ID
          "67eade1800187dbb6aad", // Replace with your collection ID
          documentId, 
          { quantity: cartItem.quantity + 1 }
        );
      } else if (action === "decrease" && cartItem.quantity > 1) {
        await databases.updateDocument(
          "67e83c7d003109ed269c", // Replace with your database ID
          "67eade1800187dbb6aad", // Replace with your collection ID
          documentId, 
          { quantity: cartItem.quantity - 1 }
        );
      } else if (action === "decrease" && cartItem.quantity === 1) {
        await databases.deleteDocument(
          "67e83c7d003109ed269c", // Replace with your database ID
          "67eade1800187dbb6aad", // Replace with your collection ID
          documentId // Remove from the database
        );
      }
    } catch (error) {
      console.error("Error updating database:", error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Loading state while fetching data
  }

  // Proceed to Checkout
  const proceedToCheckout = () => {
    navigate("/checkout", { state: { cart } }); // Navigate to Checkout and pass the cart data
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between p-4 border-b mb-4">
                <div className="flex-1">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <span className="font-semibold">{item.productName}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm">Quantity: </span>
                  <div className="flex items-center">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-300 text-black rounded-md"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-300 text-black rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-bold mt-2">KSh {item.price01 * item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-4">
            <p className="font-semibold">
              Total: KSh{" "}
              {cart.reduce((acc, item) => acc + item.price01 * item.quantity, 0)}
            </p>
            <button 
              onClick={proceedToCheckout}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
