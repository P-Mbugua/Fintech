import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../Context/AuthContext"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const { resetPassword } = useAuth(); 
  const navigate = useNavigate(); 

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.warn("Please enter your email address to reset your password.");
      setLoading(false);
      return;
    }

    try {
      await resetPassword(email); 
      toast.success("Password reset email sent! Please check your inbox.");
      navigate("/login"); 
    } catch (err) {
      toast.error("Failed to send reset email. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-2 text-gray-700">Forgot Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded"
            disabled={loading} 
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
}

export default ForgotPassword;
