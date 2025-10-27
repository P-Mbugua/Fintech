import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import { Client, Account, Databases, Query } from "appwrite";
import { useNavigate } from "react-router-dom";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

function Cart() {
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // stores $id values
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchCart();
  }, []);

  const increaseQuantity = async (itemId) => {
    const cartItem = cart.find((item) => item.$id === itemId);
    if (!cartItem) return;

    try {
      await databases.updateDocument(
        "67e83c7d003109ed269c",
        "67eade1800187dbb6aad",
        cartItem.$id,
        { quantity: cartItem.quantity + 1 }
      );
      fetchCart();
    } catch (error) {
      console.error("Error increasing quantity:", error.message);
    }
  };

  const decreaseQuantity = async (itemId) => {
    const cartItem = cart.find((item) => item.$id === itemId);
    if (!cartItem) return;

    try {
      if (cartItem.quantity > 1) {
        await databases.updateDocument(
          "67e83c7d003109ed269c",
          "67eade1800187dbb6aad",
          cartItem.$id,
          { quantity: cartItem.quantity - 1 }
        );
      } else {
        await databases.deleteDocument(
          "67e83c7d003109ed269c",
          "67eade1800187dbb6aad",
          cartItem.$id
        );
      }
      fetchCart();
    } catch (error) {
      console.error("Error decreasing quantity:", error.message);
    }
  };

  // MULTI-SELECT toggle: keeps previous selections and toggles this item
  const toggleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId) // deselect
        : [...prevSelected, itemId] // add to selection
    );
  };

  // Select or deselect all items
  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]); // deselect all
    } else {
      setSelectedItems(cart.map((item) => item.$id)); // select all
    }
  };

  const formatCurrency = (amount) => `KSh ${amount.toLocaleString()}`;

  const proceedToCheckout = () => {
    const selectedProducts = cart.filter((item) =>
      selectedItems.includes(item.$id)
    );

    if (selectedProducts.length === 0) {
      alert("Please select at least one product to proceed to checkout.");
      return;
    }

    navigate("/checkout", { state: { cart: selectedProducts } });
  };

  if (loading)
    return (
      <p className="text-gray-500 text-center mt-10 text-lg font-[Poppins]">
        Loading...
      </p>
    );

  return (
    <div className="p-6 sm:p-8 md:p-10 max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl mt-10 text-gray-800 font-[Poppins]">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-green-600 text-center tracking-tight">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-center text-lg mt-10">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-gray-100 text-gray-700 text-lg">
                <tr>
                  {/* Select All checkbox in header */}
                  <th className="py-3 px-4 text-center font-semibold">
                    <input
                      type="checkbox"
                      onChange={toggleSelectAll}
                      checked={selectedItems.length === cart.length && cart.length > 0}
                      indeterminate={selectedItems.length > 0 && selectedItems.length < cart.length} // Note: React doesn't support this prop directly
                      className="w-5 h-5 accent-green-500 cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-4 font-semibold">Product</th>
                  <th className="py-3 px-4 text-center font-semibold">Price</th>
                  <th className="py-3 px-4 text-center font-semibold">Quantity</th>
                  <th className="py-3 px-4 text-center font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr
                    key={item.$id}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 ${
                      selectedItems.includes(item.$id) ? "bg-green-50" : "bg-white"
                    }`}
                  >
                    {/* Checkbox on left */}
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.$id)}
                        onChange={() => toggleSelectItem(item.$id)}
                        className="w-5 h-5 accent-green-500 cursor-pointer"
                      />
                    </td>

                    <td className="py-4 px-4 flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-300"
                      />
                      <span className="font-medium text-gray-800 text-base sm:text-lg">
                        {item.productName}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center text-gray-700 font-semibold">
                      {formatCurrency(item.price01)}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() => decreaseQuantity(item.$id)}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg font-semibold 
                          hover:bg-green-500 hover:text-white hover:scale-105 active:scale-95 
                          transition-all duration-300 ease-in-out"
                        >
                          −
                        </button>
                        <span className="text-lg font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.$id)}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg font-semibold 
                          hover:bg-green-500 hover:text-white hover:scale-105 active:scale-95 
                          transition-all duration-300 ease-in-out"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center text-green-600 font-bold">
                      {formatCurrency(item.price01 * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 bg-gray-50 p-5 rounded-xl shadow-inner">
            <p className="text-xl sm:text-2xl font-semibold text-gray-700">
              Selected Total:{" "}
              <span className="text-green-600 font-bold">
                {formatCurrency(
                  cart
                    .filter((item) => selectedItems.includes(item.$id))
                    .reduce((acc, item) => acc + item.price01 * item.quantity, 0)
                )}
              </span>
            </p>
            <button
              onClick={proceedToCheckout}
              className="mt-4 sm:mt-0 px-6 py-3 bg-green-600 text-white text-lg font-medium 
              rounded-xl shadow-md hover:bg-green-700 hover:scale-105 hover:shadow-lg 
              active:scale-95 transition-all duration-300 ease-in-out"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
