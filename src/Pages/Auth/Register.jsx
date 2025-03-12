import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";

function Register() {
  const { register } = useAuth();
  const [phoneOrEmail, setPhoneOrEmail] = useState("phone");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [usePassword, setUsePassword] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      return setError("You must agree to the terms and conditions");
    }
    try {
      setError("");
      if (usePassword) {
        await register(contact, password);
      } else {
        await register(contact, otp);
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create an account");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Register</h2>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 ${phoneOrEmail === "phone" ? "border-b-2 border-red-500" : "text-gray-500"}`}
            onClick={() => {
              setPhoneOrEmail("phone");
              setUsePassword(false);
            }}
          >
            Phone
          </button>
          <button
            className={`px-4 py-2 ${phoneOrEmail === "email" ? "border-b-2 border-red-500" : "text-gray-500"}`}
            onClick={() => setPhoneOrEmail("email")}
          >
            Email
          </button>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type={phoneOrEmail === "phone" ? "tel" : "email"}
            placeholder={phoneOrEmail === "phone" ? "Phone Number" : "Email"}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Show OTP field for phone or when not using password */}
          {!usePassword && (
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-2/3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button type="button" className="text-red-500">Send</button>
            </div>
          )}

          {/* Show password field if email is selected and user wants to log in with a password */}
          {phoneOrEmail === "email" && usePassword && (
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={agreed} 
              onChange={() => setAgreed(!agreed)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">
              I agree to the <a href="#" className="text-red-500">Terms & Conditions</a>
            </span>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Submit
          </button>
        </form>

        {/* Toggle OTP and Password Login */}
        {phoneOrEmail === "email" && (
          <p 
            className="text-sm text-gray-600 my-2 cursor-pointer"
            onClick={() => setUsePassword(!usePassword)}
          >
            {usePassword ? "Use OTP instead" : "Login with password"}
          </p>
        )}

        {/* Social Logins */}
        <div className="flex justify-center space-x-4 mt-3">
          <button className="flex items-center space-x-2 border px-4 py-2 rounded">
            <FaGoogle className="text-red-500" /> <span>Google</span>
          </button>
          <button className="flex items-center space-x-2 border px-4 py-2 rounded">
            <FaFacebook className="text-blue-600" /> <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
