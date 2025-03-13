import React, { useState, useEffect } from "react";

const hotSalesData = [
  { id: 1, name: "NIVEA UV Face Shine Control", price: 899, oldPrice: 1300, discount: 31, stock: 100, image: "nivea.png" },
  { id: 2, name: "VON Twin Tub Washing Machine", price: 17490, oldPrice: 29995, discount: 42, stock: 100, image: "washing_machine.png" },
  { id: 3, name: "Samsung A05, 6.7' 4GB RAM", price: 10430, oldPrice: 12516, discount: 17, stock: 19, image: "samsung_a05.png" },
  { id: 4, name: "Poco C75, 128GB + 8GB RAM", price: 12999, oldPrice: 16819, discount: 23, stock: 65, image: "poco_c75.png" },
  { id: 5, name: "Infinix Smart 8 6.6' HD", price: 8499, oldPrice: 13999, discount: 39, stock: 82, image: "infinix_smart8.png" },
  { id: 6, name: "VON 3 Gas + 1 Electric Cooker", price: 22299, oldPrice: 35000, discount: 36, stock: 67, image: "von_cooker.png" }
];

function HotSales() {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [salesData, setSalesData] = useState(hotSalesData);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          refreshSales();
          return 7200;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const refreshSales = () => {
    // Simulate fetching new sales data (can be replaced with API call)
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
    <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <span className="mr-2">⚡</span> Flash Sales | Live Now
        </h2>
        <p className="text-lg font-semibold">Time Left: {formatTime(timeLeft)}</p>
        <a href="#" className="underline">See All</a>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotSales;
