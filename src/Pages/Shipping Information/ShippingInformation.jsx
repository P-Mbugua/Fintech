import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Client, Databases } from "appwrite";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");
const databases = new Databases(client);

function ShippingInformation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { shippingInfo: initialShippingInfo } = location.state || {}; // Get shipping info from the previous page
  const [formData, setFormData] = useState(initialShippingInfo || {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    region: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Save the form data to Appwrite (adjust the logic as needed)
      await databases.createDocument(
        '67e83c7d003109ed269c',
        '67f1135f0015843036ee',
        'unique()',
        formData
      );

      navigate('/checkout'); // Redirect back to the checkout page
    } catch (error) {
      console.error('Error saving shipping information:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Edit Shipping Information</h2>
      <form>
        <div className="mb-4">
          <label className="block">First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Region</label>
          <input
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-6 rounded"
          >
            Save Shipping Info
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingInformation;
