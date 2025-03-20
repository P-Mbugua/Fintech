import React from "react";

const products = [
  {
    id: 1,
    name: "GLD 43 Inch Full HD Smart TV Android LED",
    price: "KSh 19,399",
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/87/3458603/1.jpg?5037",
    rating: 4,
    stock: 10,
  },
  {
    id: 2,
    name: "Lenovo Yoga 11E 4GB RAM 128GB SSD",
    price: "KSh 10,999",
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/80/0535061/1.jpg?7984",
    rating: 4.5,
    stock: 5,
  },
  {
    id: 3,
    name: "Mexico Modern Wooden TV Stand",
    price: "KSh 4,299",
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/6411611/1.jpg?3247",
    rating: 4,
    stock: 8,
  },
  {
    id: 4,
    name: "Infinix Hot 50i 128GB + 12(6+6)GB RAM",
    price: "KSh 11,999",
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/88/7356192/1.jpg?1517",
    rating: 4.5,
    stock: 15,
  },
  {
    id: 5,
    name: "Samsung Galaxy A16 128GB + 4GB RAM",
    price: "KSh 17,599",
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/51/7439692/1.jpg?3131",
    rating: 4.8,
    stock: 3,
  },
  {
    id: 6,
    name: "Vitron Bluetooth-Enabled 32\" TV",
    price: "KSh 13,495",
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/06/2047251/1.jpg?7632",
    rating: 4.7,
    stock: 12,
  },
];

function ProductsPage() {
  return (
    <div className="p-4 bg-red-600 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">Featured Products</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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