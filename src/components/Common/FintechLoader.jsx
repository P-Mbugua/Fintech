import React from "react";

const FintechLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute w-full h-full border-4 border-blue-600 border-r-transparent rounded-full animate-spin [animation-delay:-0.2s]"></div>
        {/* <div className="absolute w-full h-full border-4 border-green-600 border-b-transparent rounded-full animate-spin [animation-delay:-0.4s]"></div> */}
      </div>
    </div>
  );
};

export default FintechLoader;
