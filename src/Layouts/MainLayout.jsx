import React from "react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import HotSales from "../Pages/Home/HotSales";
import Banner from "../Pages/Home/Banner";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>{children}</main>
      <Banner></Banner>
      <HotSales></HotSales>
      <Footer />
    </div>
  );
}

export default MainLayout;
