import React from "react";

const HomePage = () => {
  return (
    <div className="flex">
      {/* Sidebar Menu */}
      <aside className="w-1/5 bg-red-500 text-white p-4 hidden md:block">
        <h2 className="text-lg font-bold mb-4">Category</h2>
        <ul className="space-y-2">
          {[
            "TV, Audio & Video",
            "Shoes",
            "Phones & Accessories",
            "Home & Kitchen",
            "Health & Beauty",
            "Appliances",
            "Bags",
            "Clothes",
          ].map((category, index) => (
            <li key={index} className="cursor-pointer hover:underline">
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-blue-200">
        {/* Hero Banner */}
        <div className="relative w-full h-64 bg-blue-600 text-white flex items-center justify-center rounded-md">
          <h2 className="text-3xl font-bold">Tech Week - Up to 60% Off!</h2>
        </div>

        {/* Featured Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { title: "Portable Wardrobe", price: "KSh 2,299", img: "/wardrobe.png" },
            { title: "Baby Oil 100ml", price: "KSh 409", img: "/oil.png" },
            { title: "Beauty Starter Kit", price: "KSh 2,438", img: "/beauty.png" },
            { title: "TECNO Spark 30C", price: "KSh 11,599", img: "/phone.png" },
          ].map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md">
              <img src={product.img} alt={product.title} className="w-full h-32 object-cover mb-2" />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-green-500 font-bold">{product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
