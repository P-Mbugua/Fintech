import React from 'react';

function HomeAccessories() {
  const accessories = [
    { id: 1, name: 'Lamp', price: 'KES 2,000', image: 'lamp.jpg' },
    { id: 2, name: 'Vase', price: 'KES 1,500', image: 'vase.jpg' },
    { id: 3, name: 'Cushion', price: 'KES 1,200', image: 'cushion.jpg' },
    { id: 4, name: 'Clock', price: 'KES 3,000', image: 'clock.jpg' },
    { id: 5, name: 'Table', price: 'KES 5,000', image: 'table.jpg' },
    { id: 6, name: 'Curtain', price: 'KES 1,800', image: 'curtain.jpg' }
  ];

  return (
    <div className="home-accessories py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Stylish Home Accessories</h1>
      <div className="accessories-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {accessories.map((accessory) => (
          <div key={accessory.id} className="accessory-card bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
            <img src={accessory.image} alt={accessory.name} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{accessory.name}</h3>
              <p className="text-gray-500 mb-4">{accessory.price}</p>
              <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeAccessories;
