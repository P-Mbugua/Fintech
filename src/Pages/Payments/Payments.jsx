import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Optional: for notifications, you can install this if you don't have it already.

function Payments() {
  const [loading, setLoading] = useState(false);

  // Function to handle payment initiation
  const handlePayment = async () => {
    setLoading(true);
    try {
      // Example API request to a third-party service like Pesapal (replace with actual API endpoint)
      const response = await fetch("https://your-payment-gateway-api.com/stk-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: "user_phone_number",  // Replace with the actual user's phone number
          amount: 100,  // Example payment amount
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Payment initiated successfully! Please confirm on your phone.");
      } else {
        toast.error("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="payment-container">
      <h2 className="text-2xl font-semibold mb-4">Make a Payment</h2>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-all"
      >
        {loading ? "Processing..." : "Pay via M-Pesa"}
      </button>
    </div>
  );
}

export default Payments;
