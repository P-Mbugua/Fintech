import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { FaBars } from "react-icons/fa";

const categories = [
  "Virtual Shopping Assistants",
  "Appliances",
  "Automotive & DIY",
  "Baby & Toddler",
  "Beauty",
  "Books & Courses",
  "Camping & Outdoor",
  "Clothing & Shoes",
  "Electronics",
  "Gaming & Media",
  "Garden, Pool & Patio",
  "Groceries & Household",
  "Health & Personal Care",
  "Homeware",
  "Liquor",
  "Office & Stationery",
  "Pets",
  "Sport & Training",
  "Toys",
];

const banners = [
  "/banner1.jpg",
  "/banner2.jpg",
  "/banner3.jpg",
];

function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-lg">
        <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-2 mb-4">
          <FaBars /> Shop by Department
        </h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200 rounded"
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Banner Carousel */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="w-full h-64 rounded-lg overflow-hidden shadow-lg"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </div>
  );
}

export default Home;
