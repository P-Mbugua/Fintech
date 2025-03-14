import React from "react";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";

const recommendedItems = [
  {
    id: 1,
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/14/2983552/1.jpg?0779",
    title: "Fashion Lady Square Bag",
    price: "KSh 429",
    oldPrice: "KSh 609",
    discount: "-29%",
  },
  {
    id: 2,
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/69/3383252/1.jpg?7808",
    title: "Fashion Lady Square Bag",
    price: "KSh 399",
    oldPrice: "KSh 609",
    discount: "-34%",
  },
  {
    id: 3,
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/77/1390251/1.jpg?0577",
    title: "STY Women Purse Mini",
    price: "KSh 399",
    oldPrice: "KSh 699",
    discount: "-43%",
  },
  {
    id: 4,
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/7463552/1.jpg?9016",
    title: "Fashion Lady Square Bag",
    price: "KSh 399",
    oldPrice: "KSh 609",
    discount: "-34%",
  },
  {
    id: 5,
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/77/8961962/1.jpg?8559",
    title: "Fashion Women's Small Bag",
    price: "KSh 450",
    oldPrice: "KSh 809",
    discount: "-44%",
  },
  {
    id: 6,
    image: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/78/0170251/1.jpg?0964",
    title: "STY Women Small Cross Bag",
    price: "KSh 469",
    oldPrice: "KSh 799",
    discount: "-41%",
  },
  {
    id: 7,
    image: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/14/2983552/1.jpg?0779",
    title: "STY Women Small Cross Bag",
    price: "KSh 469",
    oldPrice: "KSh 799",
    discount: "-41%",
  },
];

function Recommended() {
  return (
    <div className="bg-blue-600 p-6">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="text-orange-500 w-6 h-6" /> Recommended for you
          </h2>
          <a href="#" className="text-orange-500 text-sm flex items-center">
            See All <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* Product List */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {recommendedItems.map((item) => (
            <a
              key={item.id}
              href={`/product/${item.id}`} // Dynamic navigation link
              className="w-40 bg-gray-100 p-3 rounded-md shadow-md hover:shadow-lg transition duration-300 cursor-pointer focus:ring focus:ring-orange-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-24 object-cover rounded-md"
              />
              <p className="text-sm mt-2 font-medium">{item.title}</p>
              <p className="text-lg font-bold text-gray-800">{item.price}</p>
              <p className="text-gray-500 line-through text-xs">{item.oldPrice}</p>

              {/* Discount & Star Rating */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-red-500 text-xs font-semibold bg-red-100 px-2 py-1 rounded-md">
                  {item.discount}
                </span>
                <div className="flex text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommended;
