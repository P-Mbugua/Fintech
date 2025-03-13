import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("email");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (tab === "email" && !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (tab === "phone" && phone.length < 10) {
      setError("Enter a valid phone number.");
      return;
    }
    if (code.length < 4) {
      setError("Invalid verification code.");
      return;
    }

    try {
      setLoading(true);
      await login(tab === "email" ? email : phone, code);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendCode = () => {
    if ((tab === "email" && email.includes("@")) || (tab === "phone" && phone.length >= 10)) {
      setCodeSent(true);
      setError("");
      setTimeout(() => setCodeSent(false), 60000); // Resets after 1 min
    } else {
      setError("Enter a valid email or phone.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="h-12" />
        </div>
        <h2 className="text-xl font-bold text-center mb-2 text-gray-700">Login with Verification Code</h2>

        {/* Tabs for Email/Phone Login */}
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

        <form onSubmit={handleLogin} className="space-y-3">
          {tab === "email" ? (
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-400"
            />
          ) : (
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-400"
            />
          )}

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-3/4 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-400"
            />
            <button
              type="button"
              className={`text-red-500 text-sm ${codeSent ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={sendCode}
              disabled={codeSent}
            >
              {codeSent ? "Code Sent" : "Send Code"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          <a href="/password-login" className="text-red-500 hover:underline">Login with password</a>
        </p>

        {/* Social Login Options */}
        <div className="flex flex-col space-y-3 mt-4">
          <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-200">
            <img src="/google-icon.png" alt="Google" className="h-5 mr-2" />
            Login Via Google
          </button>
          <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-200">
            <img src="/facebook-icon.png" alt="Facebook" className="h-5 mr-2" />
            Login Via Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
