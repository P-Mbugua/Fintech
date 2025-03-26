import React, { useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Laptop", price: 50000, quantity: 1 },
    { id: 2, name: "Smartphone", price: 25000, quantity: 1 },
    { id: 3, name: "Headphones", price: 5000, quantity: 1 },
  ]);

  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">Ksh {item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
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
