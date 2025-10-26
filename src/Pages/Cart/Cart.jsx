import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext"; 
import { Client, Account, Databases, Query } from "appwrite";
import { useNavigate } from "react-router-dom"; 

// Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc"); 

const account = new Account(client);
const databases = new Databases(client);

function Cart() {
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = await account.get();
        if (!user) throw new Error("User not logged in");

        const response = await databases.listDocuments(
          "67e83c7d003109ed269c", 
          "67eade1800187dbb6aad",
          [Query.equal("userId", user.$id)]
        );

        setCart(response.documents);
      } catch (error) {
        console.error("Error fetching cart:", error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchCart();
  }, [setCart]); 

  const increaseQuantity = (itemId) => {
    setCart((prevCart) => prevCart.map((item) => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item));
    updateDatabase(itemId, "increase");
  };

  const decreaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === itemId) {
            if (item.quantity === 1) return null;
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item !== null)
    );
    updateDatabase(itemId, "decrease");
  };

  const updateDatabase = async (itemId, action) => {
    try {
      const user = await account.get();
      if (!user) throw new Error("User not logged in");

      const cartItem = cart.find((item) => item.id === itemId);
      if (!cartItem) return; 

      const documentId = cartItem.$id;

      if (action === "increase") {
        await databases.updateDocument(
          "67e83c7d003109ed269c", 
          "67eade1800187dbb6aad",
          documentId, 
          { quantity: cartItem.quantity + 1 }
        );
      } else if (action === "decrease" && cartItem.quantity > 1) {
        await databases.updateDocument(
          "67e83c7d003109ed269c",
          "67eade1800187dbb6aad",
          documentId, 
          { quantity: cartItem.quantity - 1 }
        );
      } else if (action === "decrease" && cartItem.quantity === 1) {
        await databases.deleteDocument(
          "67e83c7d003109ed269c", 
          "67eade1800187dbb6aad",
          documentId 
        );
      }
    } catch (error) {
      console.error("Error updating database:", error.message);
    }
  };

  if (loading) return <p className="text-gray-500 text-center mt-10 text-sm sm:text-base md:text-lg">Loading...</p>;

  const proceedToCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  const formatCurrency = (amount) => `KSh ${amount.toLocaleString()}`;

  return (
    <div className="p-6 sm:p-8 md:p-10 max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl font-sans text-gray-800 mt-8 md:mt-14 lg:mt-14">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-green-500 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-center text-base sm:text-lg md:text-xl mt-10">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4 flex-1 mb-3 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg"
                  />
                  <span className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg">{item.productName}</span>
                </div>

                <div className="text-right space-y-1">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-400 text-black rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300 text-sm sm:text-base"
                    >
                      -
                    </button>
                    <span className="text-base sm:text-lg md:text-xl font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-1 bg-gray-400 text-black rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300 text-sm sm:text-base"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-green-500 mt-2">
                    {formatCurrency(item.price01 * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 p-4 bg-gray-100 rounded-xl shadow-inner space-y-3 sm:space-y-0">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold">
              Total: {formatCurrency(cart.reduce((acc, item) => acc + item.price01 * item.quantity, 0))}
            </p>
            <button 
              onClick={proceedToCheckout}
              className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-300 text-sm sm:text-base md:text-lg"
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
