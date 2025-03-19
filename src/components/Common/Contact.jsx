import React, { useState } from "react";
import { PhoneCall, MessageCircle, Clock, ShoppingCart, XCircle, Plus, Minus } from "lucide-react";

function Contact() {
  // State to manage expanded sections
  const [expanded, setExpanded] = useState({});

  // Toggle expansion for a specific button
  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const services = [
    { id: 1, text: "How to track your order?", icon: <ShoppingCart className="w-5 h-5" />, details: "Track your order via our tracking page with your order ID." },
    { id: 2, text: "How to cancel your order?", icon: <XCircle className="w-5 h-5 text-red-600" />, details: "Orders can be canceled before shipping. Contact support for assistance." },
    { id: 3, text: "How to return your order?", icon: <ShoppingCart className="w-5 h-5 text-green-600" />, details: "Returns are accepted within 7 days. Ensure the product is in its original packaging." },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      {/* Header Section */}
      <div className="bg-blue-700 text-white text-center py-6 shadow-lg">
        <h1 className="text-4xl font-extrabold">NEED HELP?</h1>
        <p className="mt-2 text-lg text-gray-200">We're here for you 7 days a week!</p>
      </div>

      {/* Contact Info Section */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-10 px-6">
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-lg w-full">
          <h2 className="text-xl font-semibold text-gray-700">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            If you have inquiries or need assistance, feel free to chat with us.
          </p>

          <div className="mt-6 space-y-4 text-gray-700">
            <div className="flex items-center gap-3 border-b pb-3">
              <Clock className="text-blue-600 w-6 h-6" />
              <p>
                Available <strong>Monday to Sunday</strong>, <strong>9 AM - 6 PM</strong> on Live Chats.
              </p>
            </div>
            <div className="flex items-center gap-3 border-b pb-3">
              <PhoneCall className="text-red-600 w-6 h-6" />
              <p>
                Call us: <a href="tel:+254103947514" className="font-bold hover:text-red-500">+254 103 947 514</a>
                <span className="block text-sm text-gray-500">(Mon - Fri, 9 AM - 6 PM)</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="text-green-600 w-6 h-6" />
              <p>
                Order via WhatsApp:
                <a href="https://wa.me/254701571745" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline ml-1">
                  +254 701 571 745
                </a>
                <span className="block text-sm text-gray-500">(Mon - Sun, 8 AM - 8 PM)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="w-60 h-60 bg-gray-200 rounded-lg flex items-center justify-center shadow-xl overflow-hidden">
            <img
              src="https://ke.jumia.is/cms/2023/W08/CTO/CallCenter_Lady.png"
              alt="Customer Support"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Online Services Section */}
      <div className="text-center py-12 mt-10 bg-white shadow-md rounded-lg max-w-2xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-800">Our Online Services</h2>
        <p className="text-gray-600 mt-2">Get instant support on common queries.</p>

        <div className="mt-6 space-y-4">
          {services.map((service) => (
            <div key={service.id} className="w-full">
              <button
                className="flex items-center justify-between w-full bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                onClick={() => toggleExpand(service.id)}
              >
                <span className="flex items-center gap-2 text-lg font-medium">
                  {service.icon} {service.text}
                </span>
                {expanded[service.id] ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
              {expanded[service.id] && (
                <div className="bg-gray-50 text-gray-700 px-5 py-3 mt-2 rounded-lg shadow-sm border border-gray-200 transition-all">
                  {service.details}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
