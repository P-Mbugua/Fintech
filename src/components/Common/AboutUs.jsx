import React from "react";

function AboutUs() {
  return (
    <div className="text-center text-orange-500">
      <h2 className="text-3xl font-bold my-4">About us</h2>
      
      <nav className="flex justify-center space-x-6 border-b pb-2 border-orange-500">
        <a href="#vision" className="hover:text-orange-700">Our Vision</a>
        <a href="#today" className="hover:text-orange-700">Jumia Today</a>
        <a href="#history" className="hover:text-orange-700">Our History</a>
        <a href="#awards" className="hover:text-orange-700">Awards</a>
      </nav>

      <div className="flex justify-center items-center mt-6">
        <img src="/path-to-your-image.jpg" alt="Jumia Website" className="w-1/2" />
        <div className="w-1/2 bg-orange-500 text-white p-6">
          <h3 className="text-2xl font-bold">Our Vision</h3>
          <p>Revolutionize the Shopping Experience in Africa.</p>
        </div>
      </div>

      <div className="flex justify-center space-x-10 mt-8">
        <div className="text-center">
          <div className="text-4xl">100%</div>
          <p>Providing 100% Authentic Products</p>
        </div>
        <div className="text-center">
          <div className="text-4xl">🏷️</div>
          <p>With the <span className="text-orange-700">Best Price</span> in Kenya</p>
        </div>
        <div className="text-center">
          <div className="text-4xl">1-8</div>
          <p>Offering the most Convenient Shopping</p>
        </div>
        <div className="text-center">
          <div className="text-4xl">👤</div>
          <p>Assisting You With the <span className="text-orange-700">Best Service</span> in Kenya</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
