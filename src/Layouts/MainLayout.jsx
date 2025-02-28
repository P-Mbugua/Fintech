import React from "react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-6">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
