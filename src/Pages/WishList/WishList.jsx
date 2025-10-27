import React, { useEffect } from "react";
import { useWishlist } from "../../Context/WishListContent";

const WishList = () => {
  const { wishlist, fetchWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💖 Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            <div key={item.$id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain mb-2" />
              <h3 className="font-semibold text-center">{item.name}</h3>
              <p className="text-green-600 font-bold">KES {item.price}</p>
              <button
                onClick={() => removeFromWishlist(item.$id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
