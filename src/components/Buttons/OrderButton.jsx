import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderButton({ productDetails }) {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    // Navigate to the Order Details page and pass product details via state
    navigate('/order-details', { state: { product: productDetails } });
  };

  return (
    <button
      onClick={handleOrderClick}
      className="mt-3 w-full bg-blue-600 text-white py-1 rounded-lg hover:cursor-pointer hover:bg-blue-500 transition"
    >
      Order Now
    </button>
  );
}

export default OrderButton;
