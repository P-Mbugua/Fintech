import React from "react";

function AboutUs() {
  return (
    <div className="text-center text-orange-500">
      <h2 className="text-4xl font-bold my-6">About Us</h2>
      
      <nav className="flex justify-center space-x-8 border-b pb-3 border-orange-500 text-lg font-semibold">
        <a href="#vision" className="hover:text-orange-700">Our Vision</a>
        <a href="#today" className="hover:text-orange-700">Jumia Today</a>
        <a href="#history" className="hover:text-orange-700">Our History</a>
        <a href="#awards" className="hover:text-orange-700">Awards</a>
      </nav>

      <div className="flex justify-center items-center mt-10 px-10">
        <img src="/path-to-your-image.jpg" alt="Jumia Website" className="w-1/2 rounded-lg shadow-lg" />
        <div className="w-1/2 bg-orange-500 text-white p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold">Our Vision</h3>
          <p className="mt-4 text-lg">Revolutionizing the Shopping Experience in Africa by providing seamless e-commerce solutions, quality products, and unmatched customer service.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mt-12 px-10">
        <div className="p-4 border rounded-lg shadow-md">
          <div className="text-5xl font-bold">100%</div>
          <p className="mt-2">Providing 100% Authentic Products</p>
        </div>
        <div className="p-4 border rounded-lg shadow-md">
          <div className="text-5xl">🏷️</div>
          <p className="mt-2">With the <span className="text-orange-700 font-semibold">Best Price</span> in Kenya</p>
        </div>
        <div className="p-4 border rounded-lg shadow-md">
          <div className="text-5xl font-bold">1-8</div>
          <p className="mt-2">Offering the most Convenient Shopping</p>
        </div>
        <div className="p-4 border rounded-lg shadow-md">
          <div className="text-5xl">👤</div>
          <p className="mt-2">Assisting You With the <span className="text-orange-700 font-semibold">Best Service</span> in Kenya</p>
        </div>
      </div>

      <div className="mt-16 px-10">
        <h3 className="text-3xl font-bold mb-4">Jumia Today</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4 border rounded-lg shadow-md bg-orange-100">
            <div className="text-2xl font-bold">5,000,000 Products</div>
            <p className="mt-2">Jumia offers the widest assortment at an unbeatable price</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-orange-100">
            <div className="text-2xl font-bold">16 African Countries</div>
            <p className="mt-2">#1 in Kenya online retailer and present in Morocco, Egypt...</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-orange-100">
            <div className="text-2xl font-bold">820 International & National Brands</div>
            <p className="mt-2">Samsung, Infinix, Innjoo, Vero Moda, Jack & Jones...</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-orange-100">
            <div className="text-2xl font-bold">60% Women Managers</div>
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-orange-100">
            <div className="text-2xl font-bold">1,500,000 Subscribers</div>
            <p className="mt-2">Across Kenya</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-orange-100">
            <div className="text-2xl font-bold">1200 Employees</div>
            <p className="mt-2">#1 in Kenya online retailer and present in Morocco, Egypt...</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-orange-100">
            <div className="text-2xl font-bold">15,000,000+ Monthly Visitors</div>
            <p className="mt-2">Jumia offers the widest assortment at an unbeatable price</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-orange-100">
            <div className="text-2xl font-bold">135,000 Orders</div>
            <p className="mt-2">During Black Friday 2016</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
