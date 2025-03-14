import React from "react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import HotSales from "../Pages/Home/HotSales";
import Banner from "../Pages/Home/Banner";
import Reccomended from "../Pages/Home/Reccomended";
import HotCattegories from "../Pages/Home/HotCattegories";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>{children}</main>
      <Banner></Banner>
      <HotSales></HotSales>
      <Reccomended></Reccomended>
      <HotCattegories></HotCattegories>
      <Footer />
    </div>
  );
}

export default MainLayout;
