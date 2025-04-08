import React, { useState } from 'react';

function Payments({ setPaidAmount, totalAmount }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      alert('Please enter your phone number!');
      return;
    }

    // Simulated payment logic (you can replace this with real Daraja STK Push API)
    const simulatedPaymentAmount = totalAmount;

    alert(`Simulated M-Pesa STK push to ${phoneNumber} for KSh ${simulatedPaymentAmount}`);
    setPaidAmount(simulatedPaymentAmount);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 ">M-Pesa Payment</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-black">Enter Phone Number</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="e.g. 07XXXXXXXX"
          className="border border-gray-100 p-2 bg-white rounded w-full mb-4"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Pay with M-Pesa
        </button>
      </form>
    </div>
  );
}

export default Payments;
