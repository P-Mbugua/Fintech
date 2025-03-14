import React from "react";

const categories = [
  { name: "TVs", img: "tv-image-url" },
  { name: "Appliances", img: "appliances-image-url" },
  { name: "Kitchen", img: "kitchen-image-url" },
  { name: "Home", img: "home-image-url" },
  { name: "Phones", img: "phones-image-url" },
  { name: "Refurbished Phones", img: "refurbished-phones-image-url" },
  { name: "Smartwatches", img: "smartwatches-image-url" },
  { name: "Personal Care", img: "personal-care-image-url" },
  { name: "Beauty", img: "beauty-image-url" },
  { name: "Health Care", img: "health-care-image-url" },
  { name: "Wigs and Tools", img: "wigs-tools-image-url" },
  { name: "Men Shoes", img: "men-shoes-image-url" },
  { name: "Women Shoes", img: "women-shoes-image-url" },
  { name: "Kids Shoes", img: "kids-shoes-image-url" },
  { name: "Women Accessories", img: "women-accessories-image-url" },
  { name: "Men Accessories", img: "men-accessories-image-url" },
  { name: "Women Clothes", img: "women-clothes-image-url" },
  { name: "Men Clothes", img: "men-clothes-image-url" },
  { name: "Women Bags", img: "women-bags-image-url" },
  { name: "Men Bags", img: "men-bags-image-url" },
];

const HotCategories = () => {
  return (
    <div className="bg-blue-200 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Hot Category</h2>
      <div className="grid grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md hover:shadow-lg">
            <img src={category.img} alt={category.name} className="w-16 h-16 object-contain" />
            <p className="text-sm mt-2 font-medium">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotCategories;
