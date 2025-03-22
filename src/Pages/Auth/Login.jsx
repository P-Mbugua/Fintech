import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // Import Supabase client
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("email");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);
  const navigate = useNavigate();

  // Function to send OTP via Supabase
  const sendCode = async () => {
    setError("");
    if (tab === "phone" && phone.length >= 10) {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) {
        setError("Failed to send OTP. Try again.");
      } else {
        setCodeSent(true);
        setTimeout(() => setCodeSent(false), 60000);
      }
    } else if (tab === "email" && email.includes("@")) {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setError("Failed to send verification email.");
      } else {
        setCodeSent(true);
        setTimeout(() => setCodeSent(false), 60000);
      }
    } else {
      setError("Enter a valid email or phone.");
    }
  };

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isPasswordLogin) {
        // Email & Password Login
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        if (tab === "phone") {
          const { error } = await supabase.auth.verifyOtp({
            phone,
            token: code,
            type: "sms",
          });
          if (error) throw error;
        } else {
          const { error } = await supabase.auth.verifyOtp({
            email,
            token: code,
            type: "email",
          });
          if (error) throw error;
        }
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen justify-center pt-2 pb-2">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-2 text-gray-700">Login</h2>

        {/* Tabs for Email/Phone Login */}
        {!isPasswordLogin && (
          <div className="flex justify-center mb-4">
            <button className={`px-4 py-2 ${tab === "phone" ? "border-b-2 border-red-500 text-red-500" : "text-gray-500"}`} onClick={() => setTab("phone")}>
              Phone
            </button>
            <button className={`px-4 py-2 ${tab === "email" ? "border-b-2 border-red-500 text-red-500" : "text-gray-500"}`} onClick={() => setTab("email")}>
              Email
            </button>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-3">
          {isPasswordLogin ? (
            <>
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" />
              <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" />
            </>
          ) : (
            <>
              {tab === "email" ? (
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" />
              ) : (
                <input type="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" />
              )}

              <div className="flex justify-between items-center">
                <input type="text" placeholder="Enter OTP" value={code} onChange={(e) => setCode(e.target.value)} required className="w-3/4 p-2 border border-gray-300 rounded" />
                <button type="button" className={`text-red-500 text-sm ${codeSent ? "opacity-50 cursor-not-allowed" : ""}`} onClick={sendCode} disabled={codeSent}>
                  {codeSent ? "Code Sent" : "Send Code"}
                </button>
              </div>
            </>
          )}

          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {!isPasswordLogin && (
          <p className="text-center mt-4">
            <a href="#" onClick={() => setIsPasswordLogin(true)} className="text-red-500 hover:underline">
              Login with password
            </a>
          </p>
        )}

        <div className="flex flex-col space-y-3 mt-4">
          <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-200">
            <FcGoogle className="h-5 w-5 mr-2" /> Login Via Google
          </button>
          <button className="w-full flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-200 text-blue-600">
            <FaFacebook className="h-5 w-5 mr-2" /> Login Via Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
