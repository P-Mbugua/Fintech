import React, { createContext, useContext, useState, useEffect } from "react";
import { Client, Account, Databases, ID, Permission, Role } from "appwrite";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Initialize Appwrite
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("67e83a4b001b39dcc0dc"); // Replace with your Project ID

const account = new Account(client);
const databases = new Databases(client);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user session on load
  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log("Checking user session...");
        const userData = await account.get();
        console.log("User session found:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // Register Function
  const register = async (name, email, phone, password) => {
    try {
      console.log("Registering user...");
      const newUser = await account.create(ID.unique(), email, password);
      console.log("User registered successfully:", newUser);

      // Ensure session is created before fetching user details
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);
      console.log("User session created:", userData);

      console.log("Attempting to store user in database...");
      console.log("Database ID:", "67e83c7d003109ed269c");
      console.log("Collection ID:", "67e84557002bec656b65");
      console.log("User ID:", userData.$id);

      // Store user details in the database with proper permissions
      await databases.createDocument(
        "67e83c7d003109ed269c", // Database ID
        "67e84557002bec656b65", // Collection ID
        ID.unique(),
        { name, email, phone },
        [
          Permission.read(Role.user(userData.$id)),
          Permission.update(Role.user(userData.$id)),
          Permission.delete(Role.user(userData.$id)),
        ]
      );
      console.log("User added to database successfully!");
      return userData;
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error(error.message);
    }
  };

  // Login Function (Handles existing session before login)
  const login = async (email, password) => {
    try {
      console.log("Attempting login...");

      // Ensure no active session before login
      try {
        await account.deleteSession("current");
        console.log("Previous session deleted.");
      } catch (error) {
        console.log("No existing session found, proceeding with login.");
      }

      // Create a new session
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);
      console.log("User logged in successfully:", userData);
      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error.message);
    }
  };

  // Logout Function
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

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

