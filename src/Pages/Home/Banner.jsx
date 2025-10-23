import React from "react";
import { motion } from "framer-motion";
import { Menu, Smartphone, Star, Gift, ShoppingBag } from "lucide-react";

const categories = [
  { name: "Phones & Accessories", icon: <Smartphone size={18} />, link: "/PhoneandAccessories" },
  { name: "Home & Accessories", icon: <ShoppingBag size={18} />, link: "/home-accessories" },
  { name: "Health & Beauty", icon: <Star size={18} />, link: "/health-beauty" },
  { name: "Gifts & Fashion", icon: <Gift size={18} />, link: "/gifts-fashion" },
];

const products = [
  { title: "Portable Wardrobe", price: "KSh 4,500", img: "https://img.kilimall.com/c/public/store/11337/goods/image/101468730.jpg?x-image-process=image/format,webp/resize,w_720#" },
  { title: "Baby Oil 100ml", price: "KSh 409", img: "https://img.kilimall.com/c/obs/seller/10541/goods_image/250123175708_0c62b8c8042fd169755eee95ddd76bf1.jpg?x-image-process=image/format,webp/resize,w_720#" },
  { title: "Beauty Starter Kit", price: "KSh 2,438", img: "https://image.kilimall.com/kenya/shop/store/goods/8048/2023/04/16809012720888085599ebad041a1a5dcff599d812981.jpg?x-image-process=image/format,webp/resize,w_720#" },
  { title: "TECNO Spark 30C", price: "KSh 11,599", img: "https://img.kilimall.com/c/obs/seller/2096/goods_image/240920161548_8167912c9fc1bb684477ff2aa31c3d4e.png?x-image-process=image/format,webp/resize,w_720#" },
];



/******  3b5a81f5-b0a4-43ea-9b4c-456bd48bb74b  *******/const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row lg:pt-44 md:pt-0 pt-32">
      {/* Sidebar Menu */}
      <aside className="w-1/4 bg-white p-4 shadow-lg hidden md:block">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Menu className="mr-2" /> Categories
        </h2>
        <ul>
          {categories.map((category, index) => (
            <a href={category.link} key={index} className="block">
              <motion.li
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center p-2 mb-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm"
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </motion.li>
            </a>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-100">
        {/* Promotion Banners */}
        <div className="relative w-full flex space-x-4 overflow-hidden mb-4">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 h-32 bg-red-600 text-white flex items-center justify-center text-md font-bold rounded-lg p-3 shadow-lg"
          >
            Flash Sale! Up to 70% Off
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 h-32 bg-green-500 text-white flex items-center justify-center text-md font-bold rounded-lg p-3 shadow-lg"
          >
            Free Shipping on Orders Over KSh 5,000
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-24 h-24 object-contain"
              />
              <h3 className="text-sm font-semibold text-center mt-2">
                {product.title}
              </h3>
              <p className="text-green-600 font-bold text-sm">{product.price}</p>
              <div className="mt-2 flex space-x-2">
                <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-lg flex items-center">
                  <ShoppingBag className="w-4 h-4 mr-1" /> Add
                </button>
                <button className="bg-green-500 text-white text-xs px-3 py-1 rounded-lg">
                  Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
