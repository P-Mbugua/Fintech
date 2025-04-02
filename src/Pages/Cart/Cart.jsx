import React from 'react';
import { useCart } from '../../Context/CartContext';

function Cart() {
  const { cart } = useCart(); // Get the current cart state

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
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <span className="font-semibold">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm">Quantity: {item.quantity}</span>
                  <p className="text-lg font-bold mt-2">KSh {item.price * item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="flex justify-between mt-4">
            <p className="font-semibold">Total: KSh {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
