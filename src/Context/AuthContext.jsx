import React, { createContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext(); // Export as named export

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Manage authentication state

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
