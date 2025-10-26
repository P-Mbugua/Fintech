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
import { Client, Databases, ID } from "appwrite";

function Contact() {
  const [expanded, setExpanded] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // ✅ Initialize Appwrite Client
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67e83a4b001b39dcc0dc");

  const databases = new Databases(client);

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
      await databases.createDocument(
        "67e83c7d003109ed269c",
        "messages",
        ID.unique(),
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          status: "pending",
        }
      );

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Appwrite error:", err);

      // ✅ Show error via toast only
      if (err.message.includes("current user is not authorized")) {
        toast.error("You need to login first to perform this action.");
      } else {
        toast.error(err.message || "Something went wrong. Please try again.");
      }
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
      icon: <XCircle className="w-5 h-5 text-yellow-500" />,
      details:
        "Orders can be canceled before shipping. Contact support for assistance.",
    },
    {
      id: 3,
      text: "How to return your order?",
      icon: <ShoppingCart className="w-5 h-5 text-green-500" />,
      details:
        "Returns are accepted within 7 days. Ensure the product is in its original packaging.",
    },
  ];

  return (
    <div className="bg-gray-100 py-4 font-sans mt-8 md:mt-14 lg:mt-14">

      {/* Header Section */}
      <div className="bg-green-500 w-3/4 text-white text-center py-3 shadow-lg mx-auto rounded-xl hover:shadow-2xl transition-all cursor-default">
        <h1 className="text-4xl font-extrabold">NEED HELP?</h1>
        <p className="mt-2 text-lg text-gray-100">
          We're here for you 7 days a week!
        </p>
      </div>

      {/* Contact Info & Form Section */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-10 px-6">
        <div className="bg-white shadow-xl p-8 rounded-xl max-w-lg w-full hover:shadow-2xl transition-all duration-300 cursor-default">
          <h2 className="text-2xl font-bold text-black">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            If you have inquiries or need assistance, feel free to chat with us.
          </p>

          <div className="mt-6 space-y-4 text-gray-700">
            <div className="flex items-center gap-3 border-b pb-3 hover:bg-gray-50 transition-all rounded-md p-2 cursor-pointer">
              <Clock className="text-green-500 w-6 h-6" />
              <p>
                Available <strong>Monday to Sunday</strong>,{" "}
                <strong>9 AM - 6 PM</strong> on Live Chats.
              </p>
            </div>
            <div className="flex items-center gap-3 border-b pb-3 hover:bg-gray-50 transition-all rounded-md p-2 cursor-pointer">
              <PhoneCall className="text-yellow-500 w-6 h-6" />
              <p>
                Call us:{" "}
                <a
                  href="tel:+254103947514"
                  className="font-bold hover:text-green-500 transition"
                >
                  +254 103 947 514
                </a>
                <span className="block text-sm text-gray-500">
                  (Mon - Fri, 9 AM - 6 PM)
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3 hover:bg-gray-50 transition-all rounded-md p-2 cursor-pointer">
              <MessageCircle className="text-green-500 w-6 h-6" />
              <p>
                Order via WhatsApp:
                <a
                  href="https://wa.me/254701571745"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-black hover:text-green-500 ml-1 transition"
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition hover:shadow-md cursor-text"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition hover:shadow-md cursor-text"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition hover:shadow-md cursor-text"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition hover:shadow-md cursor-text"
            ></textarea>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 font-semibold text-white rounded-md shadow-md transition-all hover:shadow-lg ${
                submitting
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="w-60 h-60 bg-gray-200 rounded-xl flex items-center justify-center shadow-xl overflow-hidden hover:shadow-2xl transition cursor-pointer">
            <img
              src="https://ke.jumia.is/cms/2023/W08/CTO/CallCenter_Lady.png"
              alt="Customer Support"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Online Services Section */}
      <div className="text-center py-12 mt-10 bg-white shadow-md rounded-xl max-w-2xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-black">Our Online Services</h2>
        <p className="text-gray-600 mt-2">
          Get instant support on common queries.
        </p>

        <div className="mt-6 space-y-4">
          {services.map((service) => (
            <div key={service.id} className="w-full">
              <button
                className="flex items-center justify-between w-full bg-green-500 text-white px-6 py-4 rounded-xl shadow-md hover:bg-green-600 hover:shadow-lg transition-all cursor-pointer"
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
                <div className="bg-gray-100 text-gray-800 px-5 py-3 mt-2 rounded-xl shadow-sm border border-gray-200 transition-all">
                  {service.details}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Contact;
