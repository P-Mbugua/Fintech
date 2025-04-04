import React, { useState } from 'react';

function ShippingInformation({ shippingInfo, onSave }) {
  const [formData, setFormData] = useState({
    firstName: shippingInfo?.firstName || '',
    lastName: shippingInfo?.lastName || '',
    phone: shippingInfo?.phone || '',
    address: shippingInfo?.address || '',
    region: shippingInfo?.region || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Call the onSave function to update the shipping info
    onSave(formData);
  };

  return (
    <div className="shipping-info-form">
      <h2 className="text-2xl font-semibold mb-4">Edit Shipping Information</h2>
      <form>
        <div className="mb-4">
          <label className="block">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Region</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg"
          >
            Save Shipping Information
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingInformation;
