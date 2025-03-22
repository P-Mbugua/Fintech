import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const register = async (contact, password) => {
    if (contact.includes("@")) {
      // Email registration
      const { error } = await supabase.auth.signUp({
        email: contact,
        password,
      });
      if (error) throw error;
    } else {
      throw new Error("Phone authentication requires custom implementation.");
    }
  };

  const sendOtp = async (phone) => {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, register, sendOtp }}>
      {children}
    </AuthContext.Provider>
  );
}
