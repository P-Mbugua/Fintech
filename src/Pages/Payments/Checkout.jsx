import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Client, Databases } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your endpoint
  .setProject("67e83a4b001b39dcc0dc"); // Replace with your project ID
const databases = new Databases(client);

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get the state passed from Cart
  const { cart } = state || {}; // Extract cart data
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentMethods] = useState([
    { id: '1', name: 'Credit Card' },
    { id: '2', name: 'M-Pesa' },
    { id: '3', name: 'PayPal' },
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Fetch shipping info from the database
  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        const response = await databases.listDocuments(
          "67e83c7d003109ed269c", // Database ID
          "67f1135f0015843036ee" // Collection ID
        );
        // Assuming there's one document for the logged-in user
        const userShippingInfo = response.documents[0]; // Adjust if necessary to fetch the correct user's data
        setShippingInfo({
          firstName: userShippingInfo.firstName,
          lastName: userShippingInfo.lastName,
          phone: userShippingInfo.phone,
          address: userShippingInfo.address,
          region: userShippingInfo.region,
        });
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
        '67e83c7d003109ed269c', // Database ID
        '67f1135f0015843036ee', // Orders Collection ID
        'unique()', // Unique order ID
        {
          cart,
          shippingInfo,
          paymentMethod: paymentMethod.name,
          totalAmount: cart?.reduce((acc, item) => acc + item.price01 * item.quantity, 0) + 199, // Total with shipping
          status: 'pending',
        }
      );
      setIsOrderPlaced(true); // Set order placed status
    } catch (error) {
      console.error('Error placing the order', error);
    }
  };

  // Navigate to the shipping information page for editing
  const handleEditShipping = () => {
    navigate('/shipping', { state: { shippingInfo } });
  };

  return (
    <div className="checkout-container bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Checkout</h1>

      {/* Shipping Information Section */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Shipping Information</h2>
          {/* Button to Edit Shipping Information */}
          {shippingInfo && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleEditShipping} // Navigate to the shipping info page
            >
              Edit Shipping Information
            </button>
          )}
        </div>

        {/* Shipping Info Details */}
        <div>
          {shippingInfo ? (
            <div>
              <p><strong>Name:</strong> {shippingInfo.firstName} {shippingInfo.lastName}</p>
              <p><strong>Address:</strong> {shippingInfo.address}</p>
              <p><strong>Phone:</strong> {shippingInfo.phone}</p>
              <p><strong>Region:</strong> {shippingInfo.region}</p>
            </div>
          ) : (
            <p>No shipping information available.</p>
          )}
        </div>
      </section>

      {/* Payment Method Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
        <div>
          <select
            className="border p-2 rounded w-full"
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
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

      {/* Product List Summary Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Product List Summary</h2>
        <ul>
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <li key={index} className="flex justify-between p-4 border-b mb-4">
                <div className="flex-1">
                  <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover mr-4" />
                  <span className="font-semibold">{item.productName}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm">Quantity: </span>
                  <span>{item.quantity}</span>
                  <p className="text-lg font-bold mt-2">KSh {item.price01 * item.quantity}</p>
                </div>
              </li>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </ul>
      </section>

      {/* Total Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Total</h2>
        <p className="font-semibold">Product Amount: KSh {cart?.reduce((acc, item) => acc + item.price01 * item.quantity, 0)}</p>
        <p className="font-semibold">Shipping Fee: + KSh 199</p>
        <p className="font-semibold">Payment Amount: KSh {cart?.reduce((acc, item) => acc + item.price01 * item.quantity, 0) + 199}</p>
      </section>

      {/* Place Order Button */}
      <div className="text-center">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg"
          disabled={isOrderPlaced}
        >
          {isOrderPlaced ? 'Order Placed' : 'Place Order'}
        </button>
      </div>

      {/* Success Message */}
      {isOrderPlaced && <p className="text-center mt-4 text-green-600">Your order has been placed successfully!</p>}
    </div>
  );
}

export default Checkout;
