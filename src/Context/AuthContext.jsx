// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    checkUser();
  }, []);

  const register = async (name, email, phone, password) => {
    const { data } = await supabase.from("users").select("email").eq("email", email).single();
    if (data) throw new Error("Email is already registered.");

    const { data: newUser, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) throw signUpError;

    await supabase.from("users").insert([{ id: newUser.user.id, name, email, phone }]);
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}