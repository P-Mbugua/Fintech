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
    { id: 1, text: "How to track your order?", icon: <ShoppingCart className="w-5 h-5" />, details: "You can track your order via our tracking page with your order ID." },
    { id: 2, text: "How to cancel your order?", icon: <XCircle className="w-5 h-5" />, details: "Orders can be canceled before shipping. Contact support for assistance." },
    { id: 3, text: "How to return your order?", icon: <ShoppingCart className="w-5 h-5" />, details: "Returns are accepted within 7 days. Ensure the product is in its original packaging." },
  ];

  return (
    <div className="bg-white pt-1">
      {/* Header Section */}
      <div className="bg-blue-600 text-white text-center py-1 w-3/4 mx-auto">
        <h1 className="text-4xl font-extrabold">NEED HELP?</h1>
        <p className="mt-2 text-lg text-gray-200">We're here for you 7 days a week!</p>
      </div>

      {/* Contact Info Section */}
      <div className="flex flex-col md:flex-row items-center justify-center p-10 gap-10">
        <div className="text-center md:text-left max-w-lg">
          <p className="text-gray-700 text-lg">If you have inquiries or need assistance, feel free to chat with us.</p>
          <div className="mt-6 space-y-4 text-gray-600">
            <p className="flex items-center gap-2">
              <Clock className="text-red-600" />
              Available <strong>Monday to Sunday</strong>, <strong>9 am - 6 pm</strong> on Live Chats.
            </p>
            <p className="flex items-center gap-2">
              <PhoneCall className="text-red-600" />
              Call us: <a href="tel:+254103947514" className="font-bold hover:underline">+254 103 947 514</a>
              <span className="text-sm">(Mon - Fri, 9 am - 6 pm)</span>
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle className="text-green-500" />
              Order via WhatsApp: 
              <a href="https://wa.me/254701571745" target="_blank" rel="noopener noreferrer" className="font-bold text-red-600 hover:underline">
                +254 701 571 745
              </a>
              <span className="text-sm">(Mon - Sun, 8 am - 8 pm)</span>
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center shadow-lg">
          <img src="https://ke.jumia.is/cms/2023/W08/CTO/CallCenter_Lady.png" alt="Customer Support" className="rounded-lg" />
        </div>
      </div>

      {/* Online Services Section */}
      <div className="text-center py-10 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Our Online Services</h2>
        <div className="mt-6 flex flex-col items-center gap-4">
          {services.map((service) => (
            <div key={service.id} className="w-80">
              <button
                className="flex items-center justify-between w-full bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition"
                onClick={() => toggleExpand(service.id)}
              >
                <span className="flex items-center gap-2">
                  {service.icon} {service.text}
                </span>
                {expanded[service.id] ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
              {expanded[service.id] && (
                <p className="bg-gray-100 text-gray-700 px-4 py-2 mt-2 rounded-md shadow-sm transition-all">
                  {service.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
