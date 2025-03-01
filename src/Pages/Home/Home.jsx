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

const banners = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Half-Page Wrapper */}
      <div className="flex w-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Sidebar - Smaller */}
        <aside className="w-32 bg-gray-50 p-2 shadow-md">
          <h2 className="text-xs font-semibold flex items-center gap-2 border-b pb-1 mb-2">
            <FaBars /> Menu
          </h2>
          <ul className="space-y-1">
            {categories.slice(0, 6).map((category, index) => ( // Show fewer items
              <li
                key={index}
                className="cursor-pointer p-1 text-xs hover:bg-gray-200 rounded"
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content - Half Page */}
        <main className="flex-1 p-2">
          {/* Banner Carousel - Smaller */}
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            className="w-full h-32 rounded-md overflow-hidden shadow-md"
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
    </div>
  );
}

export default Home;
