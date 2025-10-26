import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Client, Databases, Query } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");
const databases = new Databases(client);

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cart: passedCart, product } = state || {};
  const [cart, setCart] = useState(passedCart || (product ? [product] : []));
  const [shippingInfo, setShippingInfo] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('delivery'); // default
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(false); // fetch account verification if needed

  const paymentMethods = [
    { id: 'delivery', name: 'Pay on Delivery' },
    { id: 'order', name: 'Pay on Order' },
  ];

  // Fetch shipping info from Address collection
  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        const response = await databases.listDocuments(
          "67e83c7d003109ed269c", // Database ID
          "67f1135f0015843036ee", // Address collection
          [Query.orderDesc('$createdAt'), Query.limit(1)]
        );

        const userShippingInfo = response.documents[0];

        if (userShippingInfo) {
          setShippingInfo({
            firstName: userShippingInfo.firstName || '',
            lastName: userShippingInfo.lastName || '',
            phone: userShippingInfo.phone || '',
            address: userShippingInfo.address || '',
            region: userShippingInfo.region || '',
            userId: userShippingInfo.userId || '',
            email: userShippingInfo.email || '',
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
    // Validate shipping info
    if (!shippingInfo || !shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.email) {
      alert('Please complete your shipping information before placing the order.');
      navigate('/shipping');
      return;
    }

    const paymentMethod = paymentMethods.find(method => method.id === selectedPaymentMethod);

    if (!paymentMethod) {
      alert('Please select a valid payment method!');
      return;
    }

    if (selectedPaymentMethod === 'order' && !isAccountVerified) {
      alert('Your account is not verified. You cannot use Pay on Order.');
      return;
    }

    try {
      await databases.createDocument(
        '67e83c7d003109ed269c', // Database ID
        '68016180000538126583', // OrderDetails collection
        'unique()',
        {
          cart: JSON.stringify(cart), // string type
          shippingInfo: JSON.stringify({
            firstName: shippingInfo.firstName,
            lastName: shippingInfo.lastName,
            phone: shippingInfo.phone,
            address: shippingInfo.address,
            region: shippingInfo.region,
            email: shippingInfo.email,
            userId: shippingInfo.userId,
          }), // string type
          paymentMethod: paymentMethod.name,
          totalAmount: cart.reduce((acc, item) => acc + (item.price01 || item.price) * (item.quantity || 1), 0) + 199,
          status: 'pending',
          userEmail: shippingInfo.email,
          userName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        }
      );
      setIsOrderPlaced(true);
    } catch (error) {
      console.error('Error placing the order', error);
      alert('Failed to place order. Check console for details.');
    }
  };

  const handleEditShipping = () => {
    navigate('/shipping', { state: { shippingInfo } });
  };

  const handlePaymentChange = (e) => {
    const selected = e.target.value;
    if (selected === 'order' && !isAccountVerified) {
      alert('Your account is not verified. You cannot use Pay on Order.');
      return;
    }
    setSelectedPaymentMethod(selected);
  };

  const formatCurrency = (amount) => `KSh ${amount.toLocaleString()}`;

  return (
    <div className="checkout-container bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl max-w-5xl mx-auto relative font-sans text-gray-800 mt-8 md:mt-14 lg:mt-14">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center text-green-500">Checkout</h1>

      {/* Shipping Info */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold text-gray-800">Shipping Information</h2>
          <button
            onClick={handleEditShipping}
            className="bg-green-500 text-white py-2 px-5 sm:px-6 rounded-md shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Edit
          </button>
        </div>

        <div className="space-y-2 text-sm sm:text-base md:text-lg bg-gray-100 p-5 rounded-xl">
          {shippingInfo ? (
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Name:</strong> {shippingInfo.firstName} {shippingInfo.lastName}</p>
              <p><strong>Phone:</strong> {shippingInfo.phone}</p>
              <p><strong>Address:</strong> {shippingInfo.address}</p>
              <p><strong>Region:</strong> {shippingInfo.region}</p>
              <p><strong>Email:</strong> {shippingInfo.email}</p>
            </div>
          ) : (
            <p className="text-gray-400">No shipping information available.</p>
          )}
        </div>
      </section>

      {/* Payment Method */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold text-gray-800 mb-4">Payment Method</h2>
        <div className="overflow-x-auto max-w-full">
          <select
            className="border-2 border-gray-400 p-3 rounded-xl w-full max-w-full text-gray-800 text-sm sm:text-base focus:ring-2 focus:ring-green-500 transition-all duration-300 hover:border-green-500"
            onChange={handlePaymentChange}
            value={selectedPaymentMethod}
          >
            {paymentMethods.map((method) => (
              <option
                key={method.id}
                value={method.id}
                disabled={method.id === 'order' && !isAccountVerified}
              >
                {method.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Product List Summary */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold text-gray-800 mb-4">Product List Summary</h2>
        <ul className="space-y-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <img src={item.image} alt={item.productName || item.name} className="w-16 h-16 sm:w-24 sm:h-24 md:w-24 md:h-24 object-cover rounded-lg" />
                  <span className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg">{item.productName || item.name}</span>
                </div>
                <div className="text-right space-y-1 text-sm sm:text-base md:text-lg">
                  <p><span className="text-gray-600">Qty:</span> <span className="font-semibold">{item.quantity || 1}</span></p>
                  <p className="text-green-500 font-bold">{formatCurrency((item.price01 || item.price) * (item.quantity || 1))}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">Your cart is empty.</p>
          )}
        </ul>
      </section>

      {/* Total */}
      <section className="mb-10 p-5 bg-gray-100 rounded-xl shadow-inner text-sm sm:text-base md:text-lg">
        <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold text-gray-800 mb-4">Total</h2>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Product Amount:</span>
          <span>{formatCurrency(cart.reduce((acc, item) => acc + (item.price01 || item.price) * (item.quantity || 1), 0))}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Shipping Fee:</span>
          <span>{formatCurrency(199)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-400 pt-2 text-lg sm:text-xl md:text-xl font-bold text-green-500">
          <span>Total Payment:</span>
          <span>{formatCurrency(cart.reduce((acc, item) => acc + (item.price01 || item.price) * (item.quantity || 1), 0) + 199)}</span>
        </div>
      </section>

      {/* Place Order Button */}
      <div className="text-center">
        <button
          onClick={handlePlaceOrder}
          disabled={isOrderPlaced}
          className="bg-green-500 text-white py-3 px-8 sm:px-10 rounded-xl shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base md:text-lg"
        >
          {isOrderPlaced ? 'Order Placed' : 'Place Order'}
        </button>
      </div>

      {/* Success Message */}
      {isOrderPlaced && <p className="text-center mt-4 text-green-600 font-semibold text-sm sm:text-base md:text-lg">Your order has been placed successfully!</p>}
    </div>
  );
}

export default Checkout;
