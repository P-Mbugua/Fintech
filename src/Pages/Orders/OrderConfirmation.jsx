import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    orderId,
    deliveryDate,
    totalAmount,
    userEmail,
    userName,
  } = location.state || {};

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Order Confirmed 🎉
        </h2>
        <p className="text-gray-700 mb-2">
          Thank you, <span className="font-semibold">{userName}</span>!
        </p>
        <p className="text-gray-600 mb-2">
          Your order <span className="font-semibold">#{orderId}</span> has been
          successfully placed.
        </p>
        <p className="text-gray-600 mb-2">
          Expected Delivery: <strong>{deliveryDate}</strong>
        </p>
        <p className="text-gray-700 mb-6">
          Total to be Paid: <strong>KSh {totalAmount}</strong>
        </p>
      </div>
    </div>
  );
}

export default OrderConfirmation;
