import React from "react";

const products = [
  {
    id: 1,
    name: "GLD 43 Inch Full HD Smart TV Android LED",
    price: "KSh 19,399",
    image: "https://via.placeholder.com/150",
    rating: 4,
    stock: 10,
  },
  {
    id: 2,
    name: "Lenovo Yoga 11E 4GB RAM 128GB SSD",
    price: "KSh 10,999",
    image: "https://via.placeholder.com/150",
    rating: 4.5,
    stock: 5,
  },
  {
    id: 3,
    name: "Mexico Modern Wooden TV Stand",
    price: "KSh 4,299",
    image: "https://via.placeholder.com/150",
    rating: 4,
    stock: 8,
  },
  {
    id: 4,
    name: "Infinix Hot 50i 128GB + 12(6+6)GB RAM",
    price: "KSh 11,999",
    image: "https://img.kilimall.com/c/obs/seller/5238/goods_image/241031162047_605620c4e396a77e6c4e873df45fffa9.jpg?x-image-process=image/format,webp/resize,w_360#",
    rating: 4.5,
    stock: 15,
  },
  {
    id: 5,
    name: "Samsung Galaxy A16 128GB + 4GB RAM",
    price: "KSh 17,599",
    image: "https://via.placeholder.com/150",
    rating: 4.8,
    stock: 3,
  },
  {
    id: 6,
    name: "Vitron Bluetooth-Enabled 32\" TV",
    price: "KSh 13,495",
    image: "https://via.placeholder.com/150",
    rating: 4.7,
    stock: 12,
  },
];

function ProductsPage() {
  return (
    <div className="p-6 bg-red-600 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Featured Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <a
            key={product.id}
            href="#"
            className="block bg-white p-3 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="text-md font-semibold mb-1 text-gray-800">{product.name}</h2>
            <p className="text-red-500 font-bold text-md">{product.price}</p>
            <p className="text-yellow-400 text-md">{"★".repeat(Math.round(product.rating))}</p>
            <p className="text-gray-600 text-sm">Stock: {product.stock}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
