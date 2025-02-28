import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/UseAuth"; // Custom hook to check authentication

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get the authenticated user

  return user ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
