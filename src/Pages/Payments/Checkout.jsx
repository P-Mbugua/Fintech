import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Client, Databases, Query } from 'appwrite';
import Payments from './Payments'; 

// Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");
const databases = new Databases(client);

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cart } = state || {};
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentMethods] = useState([
    { id: '1', name: 'Credit Card' },
    { id: '2', name: 'M-Pesa' },
    { id: '3', name: 'PayPal' },
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        // Query to fetch the latest document using createdAt field
        const response = await databases.listDocuments(
          "67e83c7d003109ed269c",
          "67f1135f0015843036ee",
          [
            Query.orderDesc('$createdAt'),  
            Query.limit(1),  
          ]
        );
        
        const userShippingInfo = response.documents[0];
        
        if (userShippingInfo) {
          // Ensure we get the shipping details including user ID, email, etc.
          setShippingInfo({
            firstName: userShippingInfo.firstName,
            lastName: userShippingInfo.lastName,
            phone: userShippingInfo.phone,
            address: userShippingInfo.address,
            region: userShippingInfo.region,
            userId: userShippingInfo.userId,
            email: userShippingInfo.email,
          });
        } else {
          console.log('No shipping information available.');
        }
      } catch (error) {
        console.error('Error fetching shipping information', error);
      }
    };

    fetchShippingInfo();
  }, []);

  const handlePlaceOrder = async () => {
    const paymentMethod = paymentMethods.find(method => method.id === selectedPaymentMethod);
    if (!paymentMethod) {
      alert('Please select a valid payment method!');
      return;
    }

    try {
      await databases.createDocument(
        '67e83c7d003109ed269c',
        '67f1135f0015843036ee',
        'unique()',
        {
          cart,
          shippingInfo,
          paymentMethod: paymentMethod.name,
          totalAmount: cart?.reduce((acc, item) => acc + item.price01 * item.quantity, 0) + 199,
          status: 'pending',
        }
      );
      setIsOrderPlaced(true);
    } catch (error) {
      console.error('Error placing the order', error);
    }
  };

  const handleEditShipping = () => {
    navigate('/shipping', { state: { shippingInfo } });
  };

  const handlePaymentChange = (e) => {
    const selected = e.target.value;
    setSelectedPaymentMethod(selected);
    if (selected === '2') {
      setShowPaymentModal(true);
    }
  };

  return (
    <div className="checkout-container bg-white p-10 rounded-xl shadow-lg max-w-4xl mx-auto relative">
      <h1 className="text-4xl font-semibold mb-8 text-center text-indigo-600">Checkout</h1>

      {/* Shipping Information */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Shipping Information</h2>
          {shippingInfo ? (
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={handleEditShipping}
            >
              Edit Shipping Info
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={handleEditShipping}
            >
              Add Shipping Info
            </button>
          )}
        </div>

        <div className="space-y-3 text-lg">
          {shippingInfo ? (
            <div>
              <p><strong>Name:</strong> {shippingInfo.firstName} {shippingInfo.lastName}</p>
              <p><strong>Address:</strong> {shippingInfo.address}</p>
              <p><strong>Phone:</strong> {shippingInfo.phone}</p>
              <p><strong>Region:</strong> {shippingInfo.region}</p>
              <p><strong>Email:</strong> {shippingInfo.email}</p>
            </div>
          ) : (
            <p className="text-gray-500">No shipping information available.</p>
          )}
        </div>
      </section>

      {/* Payment Method */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Method</h2>
        <div className="space-y-4">
          <select
            className="border-2 p-3 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-indigo-500"
            onChange={handlePaymentChange}
            value={selectedPaymentMethod}
          >
            <option value="">Select Payment Method</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Product List Summary */}
      <section className="mb-8">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product List Summary</h2>
  <ul className="space-y-4">
    {cart && cart.length > 0 ? (
      cart.map((item, index) => (
        <li key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center">
            <img src={item.image} alt={item.productName} className="w-20 h-20 object-cover mr-4 rounded-lg" />
            <span className="font-semibold text-gray-800">{item.productName}</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600">Quantity: </span>
            <span className="font-semibold">{item.quantity}</span>
            <p className="text-lg font-bold text-indigo-600 mt-2">KSh {item.price01 * item.quantity}</p>
          </div>
        </li>
      ))
    ) : (
      <p className="text-gray-500">Your cart is empty.</p>
    )}
  </ul>
</section>

      {/* Total */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Total</h2>
        <p className="font-semibold text-lg">Product Amount: KSh {cart?.reduce((acc, item) => acc + item.price01 * item.quantity, 0)}</p>
        <p className="font-semibold text-lg">Shipping Fee: + KSh 199</p>
        <p className="font-semibold text-lg">Total Payment: KSh {cart?.reduce((acc, item) => acc + item.price01 * item.quantity, 0) + 199}</p>
      </section>

      {/* Place Order Button */}
      <div className="text-center">
        <button
          onClick={handlePlaceOrder}
          className="bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 transition duration-200"
          disabled={isOrderPlaced}
        >
          {isOrderPlaced ? 'Order Placed' : 'Place Order'}
        </button>
      </div>

      {/* Success Message */}
      {isOrderPlaced && <p className="text-center mt-4 text-green-600">Your order has been placed successfully!</p>}

      {/* Modal for M-Pesa */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-transparent bg-black flex items-center justify-center z-50">
          <div className="bg-gray-300 p-6 rounded-xl shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>
            <Payments />
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
