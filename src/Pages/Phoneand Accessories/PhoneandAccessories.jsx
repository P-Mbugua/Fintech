import React from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiShoppingBag, FiArrowRight } from "react-icons/fi"; // Import icons

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
  ],
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added ${product.name} to cart!`);
  };

  const handleOrderNow = () => {
    navigate("/order", { state: { product } });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-48 flex flex-col items-center 
                    transition-all duration-300  hover:shadow-xl hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-28 object-cover rounded-md"
      />
      <p className="text-sm font-semibold mt-2 text-center">{product.name}</p>
      <p className="text-red-600 font-bold">{product.price}</p>
      <p className="text-gray-400 line-through text-xs">{product.oldPrice}</p>
      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
        {product.discount}
      </span>

      {/* Buttons Section */}
      <div className="flex w-full mt-3 gap-2">
        <button
          className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white text-sm py-2 rounded-md 
                     hover:bg-blue-700 transition-all"
          onClick={handleAddToCart}
        >
          <FiShoppingCart className="text-lg" />
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-1 bg-green-600 text-white text-sm py-2 rounded-md 
                     hover:bg-green-700 transition-all"
          onClick={handleOrderNow}
        >
          <FiShoppingBag className="text-lg" />
        </button>
      </div>
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
          <button className="text-blue-600 hover:underline flex items-center gap-1">
            See All <FiArrowRight />
          </button>
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
          <button className="text-blue-600 hover:underline flex items-center gap-1">
            See All <FiArrowRight />
          </button>
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
