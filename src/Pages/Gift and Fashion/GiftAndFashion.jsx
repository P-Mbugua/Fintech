import React, { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa'; // Importing cart icon
import AddToCartButton from '../../components/Buttons/AddToCartButton';

function GiftAndFashion() {
  const [cart, setCart] = useState([]); // State to track cart items

  const products = [
    { id: 1, name: 'Gift Box', price: 'KES 1,200', image: 'gift-box.jpg' },
    { id: 2, name: 'Fashion Watch', price: 'KES 3,000', image: 'fashion-watch.jpg' },
    { id: 3, name: 'Leather Handbag', price: 'KES 4,500', image: 'leather-handbag.jpg' },
    { id: 4, name: 'Silk Scarf', price: 'KES 1,800', image: 'silk-scarf.jpg' },
    { id: 5, name: 'Diamond Necklace', price: 'KES 15,000', image: 'diamond-necklace.jpg' },
    { id: 6, name: 'Trendy Jacket', price: 'KES 5,000', image: 'trendy-jacket.jpg' }
  ];

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productExists = updatedCart.find((item) => item.id === product.id);

      if (!productExists) {
        updatedCart.push(product);
        alert(`${product.name} added to cart!`);
      } else {
        alert(`${product.name} is already in your cart.`);
      }
      return updatedCart;
    });
  };

  // Calculate total price of items in the cart
  const total01 = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace('KES ', '').replace(',', ''));
    return total + price;
  }, 0);

  return (
    <div className="gift-and-fashion py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Gifts & Fashion Collection</h1>
      <div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="product-card bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
            <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{product.name}</h3>
              <p className="text-gray-500 mb-4">{product.price}</p>
              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center"
              >
                <FaCartPlus className="mr-2" /> {/* Cart icon */}
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart information */}
      <div className="mt-6 text-center text-lg">
        {cart.length > 0 ? (
          <p>You have {cart.length} item(s) in your cart.</p>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Display total cost of cart */}
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold">Total: KES {total01.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default GiftAndFashion;
