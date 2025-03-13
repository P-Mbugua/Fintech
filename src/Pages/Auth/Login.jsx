import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("email");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setError("You must agree to the terms and conditions.");
      return;
    }
    try {
      await register(tab === "email" ? email : phone, code);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="h-12" />
        </div>
        <h2 className="text-xl font-bold text-center mb-2">Register with Verification Code</h2>
        
        {/* Tabs */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 ${tab === "phone" ? "border-b-2 border-red-500 text-red-500" : "text-gray-500"}`}
            onClick={() => setTab("phone")}
          >
            Phone No.
          </button>
          <button
            className={`px-4 py-2 ${tab === "email" ? "border-b-2 border-red-500 text-red-500" : "text-gray-500"}`}
            onClick={() => setTab("email")}
          >
            Email
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-3">
          {tab === "email" ? (
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-3/4 p-2 border border-gray-300 rounded"
            />
            <button type="button" className="text-red-500 text-sm">Send</button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mr-2"
            />
            <label className="text-sm">
              I agree to <a href="/terms" className="text-blue-500">Terms & Conditions</a> and <a href="/privacy" className="text-blue-500">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Submit</button>
        </form>

        <p className="text-center mt-4">
          <a href="/login" className="text-red-500">Login with password</a>
        </p>

        {/* Social Logins */}
        <div className="flex flex-col space-y-3 mt-4">
          <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2">
            <img src="/google-icon.png" alt="Google" className="h-5 mr-2" />
            Login Via Google
          </button>
          <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2">
            <img src="/facebook-icon.png" alt="Facebook" className="h-5 mr-2" />
            Login Via Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
