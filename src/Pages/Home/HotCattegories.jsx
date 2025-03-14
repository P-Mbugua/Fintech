import React from "react";

const categories = [
  { name: "TVs", img: "https://img.kilimall.com/c/common/category-icon/100001632.jpg?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Appliances", img: "appliances-image-url", link: "https://img.kilimall.com/c/common/category-icon/100001633.jpg?x-image-process=image/format,webp/resize,w_240#" },
  { name: "Kitchen", img: "kitchen-image-url", link: "https://img.kilimall.com/c/common/category-icon/100001631.jpg?x-image-process=image/format,webp/resize,w_240#" },
  { name: "Home", img: "home-image-url", link: "https://img.kilimall.com/c/common/category-icon/100001628.jpg?x-image-process=image/format,webp/resize,w_240#" },
  { name: "Phones", img: "phones-image-url", link: "https://img.kilimall.com/c/common/category-icon/100001637.jpg?x-image-process=image/format,webp/resize,w_240#" },
  { name: "Refurbished Phones", img: "https://img.kilimall.com/c/common/category-icon/100001636.png?x-image-process=image/format,webp/resize,w_240#", link: "" },
  { name: "Smartwatches", img: "https://img.kilimall.com/c/common/category-icon/100000676.jpg?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Personal Care", img: "https://img.kilimall.com/c/common/category-icon/100000614.jpg?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Beauty", img: "https://img.kilimall.com/c/common/category-icon/100000537.png?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Health Care", img: "https://img.kilimall.com/c/common/category-icon/100001155.jpg?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Wigs and Tools", img: "https://img.kilimall.com/c/common/category-icon/100000308.png?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Men Shoes", img: "https://img.kilimall.com/c/common/category-icon/100000166.jpeg?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Women Shoes", img: "https://img.kilimall.com/c/common/category-icon/100000513.jpg?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Kids Shoes", img: "https://img.kilimall.com/c/common/category-icon/100000165.jpeg?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Women Accessories", img: "https://img.kilimall.com/c/common/category-icon/100001726.png?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Men Accessories", img: "https://img.kilimall.com/c/common/category-icon/100000487.png?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Women Clothes", img: "https://img.kilimall.com/c/common/category-icon/100000490.png?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Men Clothes", img: "https://img.kilimall.com/c/common/category-icon/100000488.png?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Women Bags", img: "https://img.kilimall.com/c/common/category-icon/100000615.png?x-image-process=image/format,webp/resize,w_240#", link: "#" },
  { name: "Men Bags", img: "https://img.kilimall.com/c/common/category-icon/100000507.jpg?x-image-process=image/format,webp/resize,w_240#", link: "#" },
];

const HotCategories = () => {
  return (
    <div className="bg-blue-200 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Hot Category</h2>
      <div className="grid grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <a
            key={index}
            href={category.link}
            className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition-transform transform hover:scale-105"
          >
            <img src={category.img} alt={category.name} className="w-16 h-16 object-contain" />
            <p className="text-sm mt-2 font-medium">{category.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HotCategories;
