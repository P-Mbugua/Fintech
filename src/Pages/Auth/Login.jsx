// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Success message for reset password
  const { login, resetPassword } = useAuth(); // Ensure resetPassword is available in context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email to reset the password.");
      return;
    }

    try {
      await resetPassword(email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError("Failed to send reset email. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-2 text-gray-700">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-500 text-sm text-center">{message}</p>}

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-3 text-center">
          <button onClick={handleResetPassword} className="text-blue-500 hover:underline text-sm">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
