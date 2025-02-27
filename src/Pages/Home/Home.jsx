import React from "react";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-6">
      {/* Hero Section */}
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-600">Welcome to Our Platform</h1>
        <p className="text-lg text-gray-700">
          Discover amazing features, manage your tasks efficiently, and enjoy a seamless experience.
        </p>
      </header>

      {/* Features Section */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-blue-600">🚀 Fast & Reliable</h2>
          <p className="text-gray-600 mt-2">Our system is built for speed and efficiency.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-yellow-600">🔒 Secure & Safe</h2>
          <p className="text-gray-600 mt-2">Your data is protected with top-tier security.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-red-600">📱 Mobile-Friendly</h2>
          <p className="text-gray-600 mt-2">Enjoy a seamless experience on any device.</p>
        </div>
      </section>

      {/* Call to Action */}
      <div className="mt-10">
        <a
          href="/register"
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-700 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

export default Home;
