import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and include uppercase, lowercase letters, and a number."
      );
      setPassword(""); // Clear password field
      return;
    }

    try {
      await register(name, email, phone, password);
      toast.success(
        "Registration successful! 🎉 Please check your email (inbox & spam) to verify your account before login."
      );
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed. Please try again.");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 px-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200 transition-transform transform hover:scale-[1.02] duration-300">
        <h2 className="text-2xl font-semibold text-green-500 text-center mb-4">
          Create Account
        </h2>
        <p className="text-center text-gray-700 mb-6 text-sm">
          Join us and start your journey today
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition hover:border-green-500 hover:shadow-md cursor-text"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition hover:border-green-500 hover:shadow-md cursor-text"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition hover:border-green-500 hover:shadow-md cursor-text"
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg pr-10 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition hover:border-green-500 hover:shadow-md cursor-text"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600 hover:text-green-500 transition cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer text-sm"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-5 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-500 font-medium cursor-pointer hover:underline hover:text-green-600 transition"
          >
            Login
          </span>
        </p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Register;
