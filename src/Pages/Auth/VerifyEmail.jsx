import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Account, Client } from "appwrite";
import { CheckCircle2, XCircle, MailCheck, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying your email...");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const query = new URLSearchParams(location.search);
      const userId = query.get("userId");
      const secret = query.get("secret");

      if (!userId || !secret) {
        setError("Invalid or broken verification link. Please check your email again.");
        setStatus("");
        setLoading(false);
        return;
      }

      try {
        const client = new Client()
          .setEndpoint("https://cloud.appwrite.io/v1")
          .setProject("67e83a4b001b39dcc0dc");

        const account = new Account(client);
        await account.updateVerification(userId, secret);

        setStatus("🎉 Your email has been successfully verified!");
        setLoading(false);

        // Toast notification for user
        toast.success(
          "Email verified successfully! You will be redirected to the dashboard. ✅"
        );

        // Redirect automatically after 3 seconds
        setTimeout(() => navigate("/dashboard"), 3000);
      } catch (err) {
        console.error(err);
        setError(
          "Verification failed or link expired. Please try again. Also, check your spam folder!"
        );
        setStatus("");
        setLoading(false);
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
        
        {/* Icon Section */}
        <div className="mb-6">
          {loading && <Loader2 className="mx-auto text-green-500 w-16 h-16 animate-spin" />}
          {!loading && !error && <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 animate-bounce" />}
          {error && <XCircle className="mx-auto text-red-500 w-16 h-16 animate-shake" />}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-800 tracking-tight">
          {status || "Oops!"}
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          {loading
            ? "Please wait while we confirm your account..."
            : error
            ? error
            : "Your account is verified! Redirecting to your dashboard..."}
        </p>

        {/* Resend email if error */}
        {error && (
          <div className="mt-6">
            <p className="text-gray-700 mb-3 text-sm font-medium">
              Didn’t get the email? Resend the verification link below 👇
            </p>
            <button
              onClick={async () => {
                try {
                  const client = new Client()
                    .setEndpoint("https://cloud.appwrite.io/v1")
                    .setProject("67e83a4b001b39dcc0dc");
                  const account = new Account(client);
                  await account.createVerification(window.location.origin + "/verify");
                  toast.success("✨ Verification email sent again! Check inbox & spam.");
                } catch (err) {
                  toast.error("⚠️ Failed to resend. Try again later.");
                }
              }}
              className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-full shadow-sm w-full transition-all duration-300 hover:shadow-md"
            >
              <MailCheck className="w-5 h-5 text-green-600" /> Resend Verification Email
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-700 text-sm text-center">
        <p className="font-medium">
          Powered with 💚 by{" "}
          <a
            href="https://mbuguapeter.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-bold hover:underline"
          >
            mbuguapeter.netlify.app
          </a>
        </p>
        <p className="text-gray-500 mt-1 italic text-xs">Frontend Developer & Designer 🧠✨</p>
      </footer>
    </div>
  );
}

export default VerifyEmail;
