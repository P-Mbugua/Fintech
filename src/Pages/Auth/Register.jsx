import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
// import { auth } from "././firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Register() {
  const { register } = useAuth();
  const [phoneOrEmail, setPhoneOrEmail] = useState("phone");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [usePassword, setUsePassword] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Function to send OTP
  const handleSendOTP = async () => {
    if (!contact) {
      return setError("Please enter a valid phone number.");
    }

    try {
      setError("");

      // Setup Recaptcha
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );

      const confirmationResult = await signInWithPhoneNumber(auth, contact, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (err) {
      setError("Failed to send OTP. Try again.");
    }
  };

  // Function to verify OTP and register
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!agreed) {
      return setError("You must agree to the terms and conditions.");
    }

    try {
      setError("");
      if (!usePassword) {
        const result = await window.confirmationResult.confirm(otp);
        await register(result.user.phoneNumber, "OTP"); // Use phone number as ID
      } else {
        await register(contact, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to verify OTP or create an account.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Register</h2>
        
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 ${phoneOrEmail === "phone" ? "border-b-2 border-blue-900" : "text-gray-500"}`}
            onClick={() => {
              setPhoneOrEmail("phone");
              setUsePassword(false);
              setOtpSent(false);
            }}
          >
            Phone
          </button>
          <button
            className={`px-4 py-2 ${phoneOrEmail === "email" ? "border-b-2 border-blue-900" : "text-gray-500"}`}
            onClick={() => setPhoneOrEmail("email")}
          >
            Email
          </button>
        </div>

        {error && <p className="text-blue-900 mb-2">{error}</p>}

        <form onSubmit={handleVerifyOTP} className="space-y-3">
          <input
            type={phoneOrEmail === "phone" ? "tel" : "email"}
            placeholder={phoneOrEmail === "phone" ? "Phone Number (+254...)" : "Email"}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
          />

          {/* OTP Section */}
          {phoneOrEmail === "phone" && !usePassword && otpSent && (
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-2/3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <button type="button" className="text-blue-900" onClick={handleSendOTP}>Resend</button>
            </div>
          )}

          {!otpSent && phoneOrEmail === "phone" && (
            <button type="button" onClick={handleSendOTP} className="text-blue-900">
              Send OTP
            </button>
          )}

          {/* Password Input for Email */}
          {phoneOrEmail === "email" && usePassword && (
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
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
              I agree to the <a href="#" className="text-blue-900">Terms & Conditions</a>
            </span>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800"
          >
            {usePassword ? "Register with Password" : "Verify OTP"}
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
            <FaGoogle className="text-blue-900" /> <span>Google</span>
          </button>
          <button className="flex items-center space-x-2 border px-4 py-2 rounded">
            <FaFacebook className="text-blue-600" /> <span>Facebook</span>
          </button>
        </div>

        {/* Invisible reCAPTCHA */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}

export default Register;
