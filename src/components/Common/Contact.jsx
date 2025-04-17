import React, { useState } from "react";
import {
  PhoneCall,
  MessageCircle,
  Clock,
  ShoppingCart,
  XCircle,
  Plus,
  Minus,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [expanded, setExpanded] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState("");

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(
        "https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbw2HM4HbwtJQJz1fmHvZRic-gHyMtrfBPkmYMncwzHD1hLP2wHicWtFBkL1SpP_MGj9/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setResponse("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Show success toast
      toast.success("Message sent successfully!");

    } catch (err) {
      setResponse("Error: " + err.message);

      // Show error toast
      toast.error("Error: " + err.message);

    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    {
      id: 1,
      text: "How to track your order?",
      icon: <ShoppingCart className="w-5 h-5" />,
      details: "Track your order via our tracking page with your order ID.",
    },
    {
      id: 2,
      text: "How to cancel your order?",
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      details:
        "Orders can be canceled before shipping. Contact support for assistance.",
    },
    {
      id: 3,
      text: "How to return your order?",
      icon: <ShoppingCart className="w-5 h-5 text-green-600" />,
      details:
        "Returns are accepted within 7 days. Ensure the product is in its original packaging.",
    },
  ];

  return (
    <div className="bg-gray-100 py-1">
      {/* Header Section */}
      <div className="bg-blue-700 w-3/4 text-white text-center py-2 shadow-lg items-center mx-auto">
        <h1 className="text-4xl font-extrabold">NEED HELP?</h1>
        <p className="mt-2 text-lg text-gray-200">
          We're here for you 7 days a week!
        </p>
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
                Available <strong>Monday to Sunday</strong>,{" "}
                <strong>9 AM - 6 PM</strong> on Live Chats.
              </p>
            </div>
            <div className="flex items-center gap-3 border-b pb-3">
              <PhoneCall className="text-red-600 w-6 h-6" />
              <p>
                Call us:{" "}
                <a
                  href="tel:+254103947514"
                  className="font-bold hover:text-red-500"
                >
                  +254 103 947 514
                </a>
                <span className="block text-sm text-gray-500">
                  (Mon - Fri, 9 AM - 6 PM)
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="text-green-600 w-6 h-6" />
              <p>
                Order via WhatsApp:
                <a
                  href="https://wa.me/254701571745"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline ml-1"
                >
                  +254 701 571 745
                </a>
                <span className="block text-sm text-gray-500">
                  (Mon - Sun, 8 AM - 8 PM)
                </span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-all w-full font-semibold"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>

            {response && (
              <p className="text-sm text-center text-green-600 mt-2">
                {response}
              </p>
            )}
          </form>
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
                {expanded[service.id] ? (
                  <Minus className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
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

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Contact;
