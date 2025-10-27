import React from "react";
import { motion } from "framer-motion";
import { Menu, Smartphone, Star, Gift, ShoppingBag, Heart } from "lucide-react";
import { useWishlist } from "../../Context/WishListContent";

const categories = [
  { name: "Phones & Accessories", icon: <Smartphone size={18} />, link: "/PhoneandAccessories" },
  { name: "Home & Accessories", icon: <ShoppingBag size={18} />, link: "/home-accessories" },
  { name: "Health & Beauty", icon: <Star size={18} />, link: "/health-beauty" },
  { name: "Gifts & Fashion", icon: <Gift size={18} />, link: "/gifts-fashion" },
];

const products = [
  { id: 1, title: "Portable Wardrobe", price: 4500, img: "https://img.kilimall.com/c/public/store/11337/goods/image/101468730.jpg?x-image-process=image/format,webp/resize,w_720#" },
  { id: 2, title: "Baby Oil 100ml", price: 409, img: "https://img.kilimall.com/c/obs/seller/10541/goods_image/250123175708_0c62b8c8042fd169755eee95ddd76bf1.jpg?x-image-process=image/format,webp/resize,w_720#" },
  { id: 3, title: "Beauty Starter Kit", price: 2438, img: "https://image.kilimall.com/kenya/shop/store/goods/8048/2023/04/16809012720888085599ebad041a1a5dcff599d812981.jpg?x-image-process=image/format,webp/resize,w_720#" },
  { id: 4, title: "TECNO Spark 30C", price: 11599, img: "https://img.kilimall.com/c/obs/seller/2096/goods_image/240920161548_8167912c9fc1bb684477ff2aa31c3d4e.png?x-image-process=image/format,webp/resize,w_720#" },
];

const HomePage = () => {
  const { addToWishlist } = useWishlist();

  return (
    <div className="flex flex-col md:flex-row lg:pt-44 md:pt-0 pt-32">
      {/* Sidebar */}
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

      {/* Main */}
      <main className="flex-1 p-4 bg-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.04 }}
              className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center hover:shadow-lg transition relative"
            >
              <img src={product.img} alt={product.title} className="w-24 h-24 object-contain" />
              <h3 className="text-sm font-semibold text-center mt-2">{product.title}</h3>
              <p className="text-green-600 font-bold text-sm">KSh {product.price.toLocaleString()}</p>

              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => addToWishlist(product)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded-lg flex items-center"
                >
                  <Heart className="w-4 h-4 mr-1" /> Wishlist
                </button>
                <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-lg flex items-center">
                  <ShoppingBag className="w-4 h-4 mr-1" /> Add
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
