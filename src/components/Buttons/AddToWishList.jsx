import React, { useState } from 'react';

// Mock data representing a watch (you can replace this with real product data)
const mockProduct = {
  id: 1,
  name: "Classic Men's Watch",
  category: "Men",
  price: 4500,
  discount: 10,
  stock: 12,
  rating: 4.5,
  image: "/images/mens-watch.jpg",
};

const AddToWishList = () => {
  // State to manage the wishlist
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  );

  const handleAddToWishlist = () => {
    // Check if the product is already in the wishlist
    const isAlreadyInWishlist = wishlist.some(item => item.id === mockProduct.id);

    if (!isAlreadyInWishlist) {
      // Add product to wishlist
      const updatedWishlist = [...wishlist, mockProduct];

      // Update state and localStorage
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

      alert(`${mockProduct.name} has been added to your wishlist!`);
    } else {
      alert(`${mockProduct.name} is already in your wishlist.`);
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">🛍️ Add to Wishlist</h1>

      {/* Product Display */}
      <div className="bg-white rounded-2xl shadow-xl p-4 w-64 mx-auto">
        <img
          src={mockProduct.image}
          alt={mockProduct.name}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        <h2 className="text-lg font-bold text-gray-800">{mockProduct.name}</h2>
        <p className="text-sm text-gray-500 mb-1">{mockProduct.category}</p>

        <div className="flex items-center gap-2 mb-1">
          <p className="text-green-600 text-lg font-semibold">
            KES {(mockProduct.price - (mockProduct.discount / 100) * mockProduct.price).toLocaleString()}
          </p>
          {mockProduct.discount > 0 && (
            <p className="line-through text-sm text-gray-400">
              KES {mockProduct.price.toLocaleString()}
            </p>
          )}
        </div>

        {/* Add to Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          className="w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition duration-200"
        >
          Add to Wishlist
        </button>
      </div>
      
      {/* Wishlist Information */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Wishlist</h2>
        {wishlist.length > 0 ? (
          <ul>
            {wishlist.map((item) => (
              <li key={item.id} className="bg-gray-100 p-3 mb-2 rounded-lg">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <p className="text-sm text-green-600">KES {item.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default AddToWishList;
