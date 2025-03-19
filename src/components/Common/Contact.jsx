import React from "react";
import { PhoneCall, MessageCircle, Clock, ShoppingCart } from "lucide-react";

function Contact() {
  return (
    <div className="bg-white pt-1">
      {/* Header Section */}
      <div className="bg-blue-600 text-white text-center py-1 w-3/4 mx-auto">
        <h1 className="text-4xl font-extrabold">NEED HELP?</h1>
        <p className="mt-2 text-lg text-gray-200">
          We're here for you 7 days a week!
        </p>
      </div>

      {/* Contact Info Section */}
      <div className="flex flex-col md:flex-row items-center justify-center p-10 gap-10">
        <div className="text-center md:text-left max-w-lg">
          <p className="text-gray-700 text-lg">
            If you have inquiries or need assistance, feel free to chat with us.
          </p>
          <div className="mt-6 space-y-4 text-gray-600">
            <p className="flex items-center gap-2">
              <Clock className="text-red-600" />
              Available <strong>Monday to Sunday</strong>,{" "}
              <strong>9 am - 6 pm</strong> on Live Chats.
            </p>
            <p className="flex items-center gap-2">
              <PhoneCall className="text-red-600" />
              Call us:{" "}
              <a
                href="tel:+254103947514"
                className="font-bold hover:underline"
              >
                +254 103 947 514
              </a>
              <span className="text-sm">(Mon - Fri, 9 am - 6 pm)</span>
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle className="text-green-500" />
              Order via WhatsApp:{" "}
              <a
                href="https://wa.me/254701571745"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-red-600 hover:underline"
              >
                +254 701 571 745
              </a>
              <span className="text-sm">(Mon - Sun, 8 am - 8 pm)</span>
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center shadow-lg">
          <img
            src="https://ke.jumia.is/cms/2023/W08/CTO/CallCenter_Lady.png"
            alt="Customer Support"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Online Services Section */}
      <div className="text-center py-10 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Our Online Services</h2>
        <div className="mt-6 flex flex-col items-center gap-4">
          {["How to track your order?", "How to cancel your order?", "How to return your order?"].map((text, index) => (
            <button
              key={index}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
