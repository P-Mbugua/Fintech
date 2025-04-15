import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext"; 
import { useLocation, useNavigate } from "react-router-dom";
import { Account } from "appwrite";

function VerifyEmail() {
  const { user, loading } = useAuth();
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate from React Router v6

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      if (user.emailVerification) {
        setIsVerified(true);
        setIsVerifying(false);
      } else {
        checkVerificationStatus();
      }
    }
  }, [user]);

  const checkVerificationStatus = async () => {
    try {
      // Check the email verification status
      const account = new Account();
      const updatedUser = await account.get();
      if (updatedUser.emailVerification) {
        setIsVerified(true);
      } else {
        setError("Please verify your email to proceed.");
      }
    } catch (err) {
      setError("Error fetching user verification status.");
    } finally {
      setIsVerifying(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      const account = new Account();
      await account.createVerification(window.location.origin + "/verify");
      alert("A new verification email has been sent.");
    } catch (err) {
      setError("Error sending verification email.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isVerifying ? (
        <div>Verifying your email...</div>
      ) : isVerified ? (
        <div>Your email is verified! You can now proceed.</div>
      ) : (
        <div>
          <p>{error}</p>
          <button onClick={resendVerificationEmail}>Resend Verification Email</button>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
