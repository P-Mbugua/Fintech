import React, { useState } from 'react';
import { FaHeart, FaTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const phoneProducts = [
  {
    id: 1,
    name: "Samsung Galaxy A05s",
    brand: "Samsung",
    cover: "Black Silicone Cover",
    price: 14500,
    stock: 12,
    discount: true,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Infinix Zero 5G",
    brand: "Infinix",
    cover: "Green Flip Cover",
    price: 24500,
    stock: 7,
    discount: false,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Samsung Galaxy S22",
    brand: "Samsung",
    cover: "Clear Back Cover",
    price: 72000,
    stock: 3,
    discount: true,
    image: "https://via.placeholder.com/150",
  },
];

function Phone() {
  const [wishlist, setWishlist] = useState([]);
  const [sortBrand, setSortBrand] = useState('All');
  const navigate = useNavigate();

  const toggleWishlist = (phone) => {
    setWishlist((prev) =>
      prev.includes(phone.id) ? prev.filter((id) => id !== phone.id) : [...prev, phone.id]
    );
    navigate('/wishlist', { state: { product: phone } });
  };

  const handleBuy = (phone) => {
    navigate('/buy', { state: { product: phone } });
  };

  const handleOrder = (phone) => {
    navigate('/order', { state: { product: phone } });
  };

  const handleSortChange = (e) => {
    setSortBrand(e.target.value);
  };

  const filteredPhones =
    sortBrand === 'All'
      ? phoneProducts
      : phoneProducts.filter((phone) => phone.brand === sortBrand);

  const uniqueBrands = ['All', ...new Set(phoneProducts.map((p) => p.brand))];

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="mr-2 font-semibold">Sort by Brand:</label>
        <select value={sortBrand} onChange={handleSortChange} className="border p-2 rounded">
          {uniqueBrands.map((brand, idx) => (
            <option key={idx} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPhones.map((phone) => (
          <div
            key={phone.id}
            className="border rounded-2xl shadow-md p-4 bg-white relative"
          >
            <img
              src={phone.image}
              alt={phone.name}
              className="w-full h-40 object-cover rounded"
            />
            <div className="flex justify-between items-center mt-2">
              <h2 className="font-semibold text-lg">{phone.name}</h2>
              <button onClick={() => toggleWishlist(phone)}>
                <FaHeart
                  className={`text-xl ${
                    wishlist.includes(phone.id) ? "text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
            <p className="text-sm text-gray-600">Cover: {phone.cover}</p>
            <div className="flex items-center space-x-2 mt-1">
              {phone.discount && (
                <span className="text-green-600 flex items-center text-sm">
                  <FaTag className="mr-1" /> Discount Available
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">In Stock: {phone.stock}</p>
            <p className="text-xl font-bold text-yellow-600">KES {phone.price}</p>

            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg text-sm"
                onClick={() => handleBuy(phone)}
              >
                Buy Now
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
                onClick={() => handleOrder(phone)}
              >
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Phone;
