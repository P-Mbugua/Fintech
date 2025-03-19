import React from "react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
