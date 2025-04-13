import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // <-- Added useNavigate
import { Client, Account } from "appwrite";
import { Lock, Eye, EyeOff } from "lucide-react";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);

function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // <-- Hook for navigation

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    try {
      await account.updateRecovery(userId, secret, newPassword, confirmPassword);
      setSuccess(true);
      setMessage("✅ Password reset successful. Redirecting to login...");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login"); // <-- Redirect to login
      }, 2000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-16 bg-white shadow-xl rounded-lg border">
      <h1 className="text-2xl font-bold mb-5 text-center text-blue-700">
        Reset Your Password
      </h1>
      {message && (
        <div className={`mb-4 text-sm text-center font-medium ${success ? "text-green-600" : "text-red-600"}`}>
          {message}
        </div>
      )}
      {!success && (
        <form onSubmit={handleReset} className="flex flex-col gap-5">
          {/* New Password */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">New Password</label>
            <div className="flex items-center border rounded px-3 py-2">
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Confirm Password</label>
            <div className="flex items-center border rounded px-3 py-2">
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                className="w-full outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
