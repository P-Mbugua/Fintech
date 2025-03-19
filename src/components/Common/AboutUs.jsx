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
        <h3 className="text-3xl font-bold mb-4">Our Journey</h3>
        <p className="text-lg leading-relaxed">Since our inception, we have been committed to transforming e-commerce in Africa. Our journey started with a mission to make online shopping accessible, affordable, and reliable for everyone. Over the years, we have expanded our network, built trust with millions of customers, and partnered with top brands to deliver the best products.</p>
      </div>

      <div className="mt-12 px-10">
        <h3 className="text-3xl font-bold mb-4">Why Choose Us?</h3>
        <ul className="text-lg leading-relaxed list-disc list-inside">
          <li>Fast and reliable delivery services</li>
          <li>Secure payment options</li>
          <li>Wide range of high-quality products</li>
          <li>Dedicated customer support team</li>
          <li>Exciting deals and discounts</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutUs;