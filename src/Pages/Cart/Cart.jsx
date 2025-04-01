import React, { useEffect, useState } from "react";
import { Client, Databases, Query } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67e83a4b001b39dcc0dc"); // Your Project ID

const databases = new Databases(client);
const databaseId = "67e83c7d003109ed269c"; // Your Database ID
const collectionId = "67eade1800187dbb6aad"; // Your Collection ID

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = "pmbugua276@gmail.com"; // Replace with the actual logged-in user ID

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("userId", userId) // Ensure Appwrite filters based on userId
      ]);
      setCartItems(response.documents);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateQuantity = async (id, amount) => {
    const updatedItems = cartItems.map((item) =>
      item.$id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    );
    setCartItems(updatedItems);

    try {
      const itemToUpdate = updatedItems.find(item => item.$id === id);
      await databases.updateDocument(databaseId, collectionId, id, {
        quantity: itemToUpdate.quantity,
        total: itemToUpdate.price * itemToUpdate.quantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id) => {
    setCartItems(cartItems.filter((item) => item.$id !== id));

    try {
      await databases.deleteDocument(databaseId, collectionId, id);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Calculate total only for items fetched for this user
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.$id} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">Ksh {item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center">
                <button onClick={() => updateQuantity(item.$id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.$id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
              </div>
              <button onClick={() => removeItem(item.$id)} className="text-red-500 text-sm">Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between mt-4 font-bold">
        <span>Total:</span>
        <span>Ksh {totalPrice.toLocaleString()}</span>
      </div>
      <button className="w-full bg-green-500 text-white py-2 mt-4 rounded hover:bg-green-600">
        Checkout
      </button>
    </div>
  );
}

export default Cart;
