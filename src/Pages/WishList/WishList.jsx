import React, { useState, useEffect } from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch the wishlist from localStorage when the component mounts
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
        {halfStar && <StarHalf size={16} fill="currentColor" />}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <StarOff key={i} size={16} />
        ))}
      </div>
    );
  };

  const handleRemoveFromWishlist = (productId) => {
    // Filter out the removed product from the wishlist
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (productId) => {
    // Add to cart logic (implement later)
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-white p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">🛍️ Your Wishlist</h1>

      {/* Wishlist Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Rating</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.length > 0 ? (
              wishlist.map((item) => {
                const discountedPrice = item.price - (item.discount / 100) * item.price;

                return (
                  <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="py-4 px-6">{item.category}</td>
                    <td className="py-4 px-6">
                      <p className="text-green-600 font-semibold">
                        KES {discountedPrice.toLocaleString()}
                      </p>
                      {item.discount > 0 && (
                        <p className="line-through text-sm text-gray-400">
                          KES {item.price.toLocaleString()}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6">{renderStars(item.rating)}</td>
                    <td className="py-4 px-6">{item.stock}</td>
                    <td className="py-4 px-6 flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-200"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition duration-200"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                  Your wishlist is empty. Start adding products!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
