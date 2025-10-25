import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, googleSignIn } = useAuth(); // Make sure googleSignIn exists in AuthContext
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, phone, password);

      toast.success(
        "Registration successful! 🎉 Please check your email (inbox & spam) to verify your account before login."
      );

      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await googleSignIn();
      toast.success("Google sign-in successful! 🎉");
      navigate("/dashboard"); // or wherever you want after Google login
    } catch (err) {
      toast.error(err.message || "Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-2 text-gray-700">Register</h2>

        <form onSubmit={handleRegister} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">
            Register
          </button>
        </form>

        {/* Google Sign-in Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            <FaGoogle className="text-red-500" /> Register with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
