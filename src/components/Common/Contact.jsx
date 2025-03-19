import React from "react";

function Contact() {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-orange-500 text-white text-center py-6">
        <h1 className="text-3xl font-bold">NEED HELP?</h1>
      </div>

      {/* Contact Info Section */}
      <div className="flex flex-col md:flex-row items-center justify-center p-8 gap-8">
        <div className="text-center md:text-left max-w-lg">
          <p className="text-gray-700 text-lg">
            If you have inquiries or need assistance, do not hesitate to chat with us.
          </p>
          <p className="mt-4 text-gray-600">
            We are available from <strong>Monday to Sunday</strong> between 
            <strong> 9 am to 6 pm</strong> on Live Chats.
          </p>
          <p className="mt-2 text-gray-600">
            For other inquiries, you can reach us at <strong>+254711 011 011</strong> 
            from <strong>Monday to Friday</strong> between <strong>9 am to 6 pm</strong>.
          </p>
          <p className="mt-2 text-gray-600">
            To place an order, call or WhatsApp us at <strong>+254711 011 011</strong> 
            from <strong>Monday to Sunday</strong> between <strong>8 am to 8 pm</strong>.
          </p>
        </div>

        {/* Image */}
        <div className="w-64 h-64 bg-orange-200 rounded-lg flex items-center justify-center">
          <img
            src="https://via.placeholder.com/200" 
            alt="Customer Support"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Online Services Section */}
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-800">Our Online Services</h2>
        <div className="mt-4 flex justify-center">
          <button className="bg-gray-100 px-6 py-3 rounded-lg shadow flex items-center gap-2">
            <span role="img" aria-label="cart">🛒</span>
            <span className="text-orange-500 font-semibold">How to track your order?</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
