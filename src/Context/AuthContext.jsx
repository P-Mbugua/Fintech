import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Account, Databases, ID, Permission, Role } from "appwrite";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// ------------------ Appwrite Initialization ------------------
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------ SESSION CHECK ON LOAD ------------------
  useEffect(() => {
    const handleSession = async () => {
      try {
        const sessions = await account.listSessions();
        if (sessions.total > 0) {
          const userData = await account.get();
          setUser(userData);
          console.log("Session valid:", userData);
        } else {
          setUser(null);
          console.log("No active session found.");
        }
      } catch (error) {
        console.log("No active session (expected if unverified or logged out):", error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    handleSession();
  }, []);

  // ------------------ HELPER: Default User Document ------------------
  const buildUserDocDefaults = ({ name = "", email = "", phone = "" } = {}) => {
    const now = new Date().toISOString();
    return {
      name: name || "N/A",
      email: email || "N/A",
      phone: phone || "N/A",
      dob: "N/A",
      photo: "",
      bio: "",
      address: "",
      city: "",
      country: "",
      alt_phone: "",
      occupation: "",
      company: "",
      business_name: "",
      mpesa_number: "",
      account_status: "Inactive",
      email_verified: "No",
      last_login: now,
      $createdAt: now,
    };
  };

  // ------------------ REGISTER ------------------
  const register = async (name, email, phone, password) => {
    try {
      console.log("Registering user...");
      const newUser = await account.create(ID.unique(), email, password);
      console.log("User registered:", newUser);

      const userDoc = buildUserDocDefaults({ name, email, phone });
      await databases.createDocument(
        "67e83c7d003109ed269c", // Database ID
        "67e84557002bec656b65", // Collection ID
        ID.unique(),
        userDoc,
        [Permission.read(Role.any()), Permission.update(Role.any()), Permission.delete(Role.any())]
      );
      console.log("User document created in DB");

      await account.createEmailPasswordSession(email, password);
      await account.createVerification(`${window.location.origin}/verify`);
      console.log("Verification email sent to:", email);

      await account.deleteSession("current");
      setUser(null);

      return { message: "Verification email sent. Please verify your email before login.", user: newUser };
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error(error.message || error);
    }
  };

  // ------------------ LOGIN ------------------
  const login = async (email, password) => {
    try {
      console.log("Attempting login...");
      try { await account.deleteSession("current"); } catch { /* no active session */ }

      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();

      if (!userData.emailVerification) {
        await account.deleteSession("current");
        setUser(null);
        throw new Error("Email not verified. Please verify your email first.");
      }

      setUser(userData);
      console.log("User logged in successfully:", userData);
      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error.message);
    }
  };

  // ------------------ LOGOUT ------------------
  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
      throw new Error(error.message);
    }
  };

  // ------------------ PASSWORD RESET ------------------
  const resetPassword = async (email) => {
    try {
      await account.createRecovery(email, `${window.location.origin}/reset-password`);
      console.log("Recovery email sent");
    } catch (error) {
      console.error("Password recovery failed:", error);
      throw new Error(error.message);
    }
  };

  // ------------------ GOOGLE SIGN-IN ------------------
  const googleSignIn = async () => {
    try {
      await account.createOAuth2Session(
        "google", // provider
        `${window.location.origin}/dashboard`, // success redirect
        `${window.location.origin}/register`  // failure redirect
      );
      console.log("Redirecting to Google OAuth...");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      throw new Error(error.message || "Google sign-in failed.");
    }
  };

  // ------------------ PROVIDER ------------------
  return (
    <AuthContext.Provider value={{ user, register, login, logout, resetPassword, googleSignIn, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
