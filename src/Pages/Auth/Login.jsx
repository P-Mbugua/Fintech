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
      setIsResettingPassword(false); // Close the reset password input after sending the email
    } catch (err) {
      toast.error("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-2 text-gray-700">Login</h2>
        {!isResettingPassword ? (
          // Login Form
          <form onSubmit={handleLogin} className="space-y-3">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />

            {/* Password Input with Eye Icon */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          // Password Reset Form
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleResetPassword}
              className="w-full py-2 bg-blue-600 text-white rounded"
            >
              Send Reset Link
            </button>
            <div className="text-center mt-3">
              <button
                onClick={() => setIsResettingPassword(false)}
                className="text-blue-500 hover:underline text-sm"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}

        {!isResettingPassword && (
          // Forgot Password Link
          <div className="mt-3 text-center">
            <button
              onClick={() => setIsResettingPassword(true)}
              className="text-blue-500 hover:underline text-sm"
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
