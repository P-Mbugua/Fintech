import React from "react";

const recommendedItems = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    title: "Fashion Lady Square Bag",
    price: "KSh 429",
    oldPrice: "KSh 609",
    discount: "-29%",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    title: "Fashion Lady Square Bag",
    price: "KSh 399",
    oldPrice: "KSh 609",
    discount: "-34%",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    title: "STY Women Purse Mini",
    price: "KSh 399",
    oldPrice: "KSh 699",
    discount: "-43%",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/150",
    title: "Fashion Lady Square Bag",
    price: "KSh 399",
    oldPrice: "KSh 609",
    discount: "-34%",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/150",
    title: "Fashion Women's Small Bag",
    price: "KSh 450",
    oldPrice: "KSh 809",
    discount: "-44%",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/150",
    title: "STY Women Small Cross Bag",
    price: "KSh 469",
    oldPrice: "KSh 799",
    discount: "-41%",
  },
];

function Recommended() {
  return (
    <div className="bg-blue-500 p-4">
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recommended for you</h2>
          <a href="#" className="text-orange-500 text-sm">
            See All &gt;
          </a>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mt-4">
          {recommendedItems.map((item) => (
            <div
              key={item.id}
              className="w-40 bg-gray-100 p-2 rounded-md shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-24 object-cover rounded-md"
              />
              <p className="text-sm mt-1">{item.title}</p>
              <p className="text-lg font-bold">{item.price}</p>
              <p className="text-gray-400 line-through text-xs">
                {item.oldPrice}
              </p>
              <span className="text-red-500 text-xs font-semibold">
                {item.discount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommended;
