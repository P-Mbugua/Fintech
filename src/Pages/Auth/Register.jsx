import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return setError("You must agree to the terms and conditions.");
    try {
      setError("");
      await register(name, email, phone, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create an account.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Register</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900" />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900" />
          <div className="flex items-center">
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="mr-2 cursor-pointer" />
            <span className="text-sm text-gray-600">I agree to the <a href="#" className="text-blue-900">Terms & Conditions</a></span>
          </div>
          <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-800">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
