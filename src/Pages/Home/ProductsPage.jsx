import React from "react";

const products = [
  {
    id: 1,
    name: "GLD 43 Inch Full HD Smart TV Android LED",
    price: "KSh 19,399",
    image: "https://via.placeholder.com/150",
    rating: 4,
  },
  {
    id: 2,
    name: "Lenovo Yoga 11E 4GB RAM 128GB SSD",
    price: "KSh 10,999",
    image: "https://via.placeholder.com/150",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Mexico Modern Wooden TV Stand",
    price: "KSh 4,299",
    image: "https://via.placeholder.com/150",
    rating: 4,
  },
];

function ProductsPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-red-500 font-bold">{product.price}</p>
            <p className="text-yellow-400">{"★".repeat(Math.round(product.rating))}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
