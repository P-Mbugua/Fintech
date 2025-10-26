import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error("Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast.warn("Please enter your registered email.");
      return;
    }
    try {
      await resetPassword(resetEmail);
      toast.success("Password reset link sent! Check your email.");
      setIsResettingPassword(false);
    } catch (err) {
      toast.error("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 transition-transform transform hover:scale-[1.02] duration-300">
        <h2 className="text-2xl font-semibold text-green-500 text-center mb-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-700 mb-6 text-sm">
          Sign in to continue
        </p>

        {!isResettingPassword ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition hover:border-green-500 hover:shadow-md"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg pr-12 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition hover:border-green-500 hover:shadow-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600 hover:text-green-500 transition cursor-pointer"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading} // Disable while loading
              className={`w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer text-sm ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition hover:border-green-500 hover:shadow-md"
            />
            <button
              onClick={handleResetPassword}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              Send Reset Link
            </button>
            <div className="text-center mt-3">
              <button
                onClick={() => setIsResettingPassword(false)}
                className="text-green-500 hover:underline text-sm font-medium cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}

        {!isResettingPassword && (
          <div className="mt-3 text-center">
            <button
              onClick={() => setIsResettingPassword(true)}
              className="text-green-500 hover:underline text-sm font-medium cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default Login;
