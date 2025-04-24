import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import OrderButton from "../../components/Buttons/OrderButton";

const hotSalesData = [
  { id: 1, name: "NIVEA UV Face Shine Control", price: 899, oldPrice: 1300, discount: 31, stock: 100, image: "https://www.masoko.com/_next/image?url=https%3A%2F%2Fassets.os.masoko.com%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fa%2Fsamsung_galaxy_a16_black.png&w=1920&q=75" },
  { id: 2, name: "VON Twin Tub Washing Machine", price: 17490, oldPrice: 29995, discount: 42, stock: 100, image: "https://img.kilimall.com/c/obs/seller/100003940/goods_image/241028154000_ad2cad7b2a5d098a82dcac93f63bd382.jpg?x-image-process=image/format,webp/resize,w_720#" },
  { id: 3, name: "Samsung A05, 6.7' 4GB RAM", price: 10430, oldPrice: 12516, discount: 17, stock: 119, image: "https://www.masoko.com/_next/image?url=https%3A%2F%2Fassets.os.masoko.com%2Fmedia%2Fcatalog%2Fproduct%2Fi%2Fp%2Fiphone_16_pro_natural_titanium_3.jpg&w=1920&q=75" },
  { id: 4, name: "Poco C75, 128GB + 8GB RAM", price: 12999, oldPrice: 16819, discount: 23, stock: 65, image: "https://www.masoko.com/_next/image?url=https%3A%2F%2Fassets.os.masoko.com%2Fmedia%2Fcatalog%2Fproduct%2Fs%2F2%2Fs25-ultra-2.jpg&w=1920&q=75" },
  { id: 5, name: "Infinix Smart 8 6.6' HD", price: 8499, oldPrice: 13999, discount: 39, stock: 82, image: "https://www.masoko.com/_next/image?url=https%3A%2F%2Fassets.os.masoko.com%2Fmedia%2Fcatalog%2Fproduct%2Fr%2Fe%2Fredmi_14c_starry_blue.jpg&w=1920&q=75" },
  { id: 6, name: "VON 3 Gas + 1 Electric Cooker", price: 22299, oldPrice: 35000, discount: 36, stock: 67, image: "https://img.kilimall.com/c/obs/seller/7879/goods_image/250118232632_82004acbfe7b383df51f3591abf4ffa5.jpg?x-image-process=image/format,webp/resize,w_720#" }
];

function HotSales() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [salesData, setSalesData] = useState(hotSalesData);
  const navigate = useNavigate();

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const nextSlotHour = currentHour % 2 === 0 ? currentHour + 2 : currentHour + 1;
      const nextSlot = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nextSlotHour, 0, 0);
      const diff = Math.floor((nextSlot - now) / 1000);
      setTimeLeft(diff);
    };

    updateTimer();
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          updateTimer();
          refreshSales();
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const refreshSales = () => {
    const shuffledData = [...hotSalesData].sort(() => Math.random() - 0.5);
    setSalesData(shuffledData);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}h : ${minutes.toString().padStart(2, "0")}m : ${secs.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="bg-red-600 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <span className="mr-1">⚡</span> Flash Sales | Live Now
        </h2>
        <p className="text-lg font-semibold">Time Left: <span className="font-bold">{formatTime(timeLeft)}</span></p>

        <a href="#" className="flex items-center text-white font-semibold hover:opacity-80">
          See All <ChevronRight className="ml-1 w-5 h-5" />
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
        {salesData.map((item) => (
          <div key={item.id} className="bg-white text-black p-3 rounded-lg shadow-md relative">
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-lg">
              -{item.discount}%
            </span>
            <img src={item.image} alt={item.name} className="w-full h-32 object-contain mb-2" />
            <h3 className="text-sm font-medium truncate">{item.name}</h3>
            <p className="text-red-600 font-bold">KSh {item.price.toLocaleString()}</p>
            <p className="text-gray-500 line-through text-sm">KSh {item.oldPrice.toLocaleString()}</p>
            <p className="text-xs mt-1">{item.stock} items left</p>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
              <div
                className="h-2 bg-orange-500 rounded-full"
                style={{ width: `${(item.stock / 100) * 100}%` }}
              ></div>
            </div>
            {/* Use the OrderButton component here */}
            <OrderButton productDetails={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotSales;
