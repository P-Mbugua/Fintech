import React from 'react';

function Banner() {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] bg-blue-500 flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.png')" }}></div>
      <div className="relative z-10 text-center p-4">
        <h2 className="text-2xl md:text-4xl font-bold">Lipa pole pole with Spotit</h2>
        <p className="mt-2 text-sm md:text-lg">Live with I&M Bank and Little Sacco. Coming soon to your bank.</p>
        <button className="mt-4 bg-white text-blue-500 font-bold py-2 px-4 rounded-md shadow-md">
          SHOP NOW
        </button>
      </div>
    </div>
  );
}

export default Banner;
