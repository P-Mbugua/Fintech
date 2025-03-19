import React from "react";

const products = {
  refurbishedPhones: [
    {
      id: 1,
      name: "Badili Samsung Galaxy A2...",
      price: "KSh 7,999",
      oldPrice: "KSh 14,999",
      discount: "-47%",
      image: "https://example.com/samsung-a2.jpg",
    },
    {
      id: 2,
      name: "Oppo Refurbished A83 4...",
      price: "KSh 7,888",
      oldPrice: "KSh 12,098",
      discount: "-38%",
      image: "https://example.com/oppo-a83.jpg",
    },
    // Add more products...
  ],
  mobileAccessories: [
    {
      id: 1,
      name: "Utarudi G577 Business S...",
      price: "KSh 2,059",
      oldPrice: "KSh 3,467",
      discount: "-41%",
      image: "https://example.com/utarudi-g577.jpg",
    },
    {
      id: 2,
      name: "Utarudi GT99 Color Touch...",
      price: "KSh 1,945",
      oldPrice: "KSh 3,999",
      discount: "-51%",
      image: "https://example.com/utarudi-gt99.jpg",
    },
    // Add more products...
  ],
};

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-md w-40">
      <img src={product.image} alt={product.name} className="w-full h-24 object-cover" />
      <p className="text-sm font-semibold mt-2">{product.name}</p>
      <p className="text-red-600 font-bold">{product.price}</p>
      <p className="text-gray-400 line-through text-xs">{product.oldPrice}</p>
      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">{product.discount}</span>
    </div>
  );
};

function PhoneandAccessories() {
  return (
    <div className="p-4">
      {/* Refurbished Phones */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-white bg-blue-500 px-4 py-2 rounded-md">
            Refurbished Phones | As Low As 9K
          </h2>
          <button className="text-blue-600 hover:underline">See All ➤</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          {products.refurbishedPhones.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Mobile Accessories */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-white bg-blue-500 px-4 py-2 rounded-md">
            Mobile Accessories
          </h2>
          <button className="text-blue-600 hover:underline">See All ➤</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          {products.mobileAccessories.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhoneandAccessories;
