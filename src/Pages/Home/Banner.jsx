import React from "react";
import { motion } from "framer-motion";
import { Menu, Smartphone, Star, Gift, ShoppingBag } from "lucide-react";

const categories = [
  { name: "Phones & Accessories", icon: <Smartphone size={20} /> },
  { name: "Home & Accessories", icon: <ShoppingBag size={20} /> },
  { name: "Health & Beauty", icon: <Star size={20} /> },
  { name: "Gifts & Fashion", icon: <Gift size={20} /> },
];

const products = [
  { title: "Portable Wardrobe", price: "KSh 4,500", img: "/wardrobe.png" },
  { title: "Baby Oil 100ml", price: "KSh 409", img: "/oil.png" },
  { title: "Beauty Starter Kit", price: "KSh 2,438", img: "/oil.png" },
  { title: "TECNO Spark 30C", price: "KSh 11,599", img: "/phone.png" },
];

const promotions = [
  { text: "Flash Sale - Up to 70% Off!", color: "bg-red-500", direction: "left" },
  { text: "Exclusive Deals on Electronics!", color: "bg-green-500", direction: "right" },
];

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar Menu */}
      <aside className="w-1/4 bg-white p-4 shadow-lg hidden md:block">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Menu className="mr-2" /> Categories
        </h2>
        <ul>
          {categories.map((category, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center p-3 mb-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </motion.li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-64 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-center text-white p-6 rounded-lg"
        >
          <h2 className="text-3xl font-bold">Tech Week - Up to 60% Off!</h2>
        </motion.div>

        {/* Promotion Banners */}
        <div className="mt-6 space-y-4">
          {promotions.map((promo, index) => (
            <motion.div
              key={index}
              initial={{ x: promo.direction === "left" ? -300 : 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className={`p-4 text-white text-lg font-bold ${promo.color} rounded-lg text-center`}
            >
              {promo.text}
            </motion.div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-2xl transition"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-32 h-32 object-contain"
              />
              <h3 className="text-lg font-semibold text-center mt-3">
                {product.title}
              </h3>
              <p className="text-green-600 font-bold">{product.price}</p>
              <div className="mt-2 flex space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  Order Now
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