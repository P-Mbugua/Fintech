import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaFacebook } from "react-icons/fa"; // Facebook icon
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, code);
      navigate("/dashboard"); // Redirect after login
    } catch (err) {
      setError("Failed to log in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {/* Kilimall Header */}
        <div className="flex items-center justify-center mb-4">
          <img src="/logo.png" alt="Kilimall" className="h-10" />
        </div>

        <h2 className="text-lg font-semibold text-center mb-2">Login with verification code</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Tabs for Phone & Email */}
        <div className="flex justify-center space-x-4 mb-4">
          <button className="text-gray-600 focus:outline-none">📞 Phone No.</button>
          <button className="text-red-600 border-b-2 border-red-600 focus:outline-none">📧 Email</button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded"
          />
          
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Please input code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="border p-2 rounded flex-grow"
            />
            <button type="button" className="text-red-500">Send</button>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" required className="w-4 h-4" />
            <label htmlFor="terms" className="text-sm">
              I agree to Kilimall <a href="#" className="text-blue-500">Terms & Conditions</a> and <a href="#" className="text-blue-500">Privacy Policy</a>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-red-500 text-white p-2 rounded font-semibold">Submit</button>
        </form>

        {/* Login with Password Link */}
        <p className="text-center text-red-500 mt-3 cursor-pointer">login with password</p>

        {/* Social Login Options */}
        <div className="flex flex-col space-y-3 mt-4">
          <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-200">
            <FcGoogle className="h-5 w-5 mr-2" />
            Login Via Google
          </button>
          <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-200">
            <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
            Login Via Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
