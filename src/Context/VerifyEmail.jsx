import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Account, Databases } from "appwrite";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Initialize Appwrite
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("67e83a4b001b39dcc0dc"); // Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // Register function with email verification
  const register = async (name, email, phone, password) => {
    try {
      // Create a new user account
      const newUser = await account.create("unique()", email, password);

      if (newUser) {
        // Store additional user data in database
        await databases.createDocument(
          "your_database_id", // Replace with your Database ID
          "your_collection_id", // Replace with your Collection ID
          "unique()", // Auto-generate unique document ID
          { name, email, phone }
        );

        // Send verification email
        await account.createVerification("https://yourwebsite.com/verify-email");
      }

      // Fetch the user data and update state
      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Login function (prevents login if email is not verified)
  const login = async (email, password) => {
    try {
      await account.createEmailSession(email, password);
      const userData = await account.get();

      if (!userData.emailVerification) {
        throw new Error("Please verify your email before logging in.");
      }

      setUser(userData);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Logout function
  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
