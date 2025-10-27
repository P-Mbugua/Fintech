import React, { useState, useEffect } from 'react';
import { Client, Databases, Account, Query } from 'appwrite';

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const databases = new Databases(client);
const account = new Account(client);

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserEmail(user.email);
      } catch (err) {
        console.error('User not logged in', err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    const fetchOrders = async () => {
      try {
        const response = await databases.listDocuments(
          '67e83c7d003109ed269c', 
          '68016180000538126583', 
          [
            Query.equal('userEmail', userEmail),
            Query.orderDesc('$createdAt'),
            Query.limit(50)
          ]
        );
        setOrders(response.documents);
      } catch (err) {
        console.error('Error fetching orders', err);
      }
    };

    fetchOrders();
  }, [userEmail]);

  const formatCurrency = (amount) => `KSh ${amount.toLocaleString()}`;

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const statusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto font-sans text-gray-800">
      <h1 className="text-3xl font-extrabold text-green-600 mb-8 text-center md:text-left tracking-wide">My Orders</h1>

      {/* Small Screens - Card Style */}
      <div className="space-y-6 lg:hidden">
        {orders.length > 0 ? orders.map(order => {
          const cartItems = JSON.parse(order.cart);
          const shipping = JSON.parse(order.shippingInfo);

          return (
            <div key={order.$id} className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300">
              
              {/* Products */}
              <div className="space-y-3 mb-4">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <img src={item.image} alt={item.productName || item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="text-gray-800 font-semibold truncate">{item.productName || item.name}</p>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity || 1}</p>
                      <p className="text-green-600 font-bold mt-1">{formatCurrency((item.price01 || item.price) * (item.quantity || 1))}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700 text-sm">
                <p className="font-semibold">Name:</p>
                <p>{shipping.firstName} {shipping.lastName}</p>
                <p className="font-semibold">Phone:</p>
                <p>{shipping.phone}</p>
                <p className="font-semibold">Address:</p>
                <p>{shipping.address}, {shipping.region}</p>
              </div>

              {/* Payment & Status */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-gray-800 font-medium">{order.paymentMethod}</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Total & Action */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-green-600 font-bold text-lg">{formatCurrency(order.totalAmount)}</p>
                <button
                  onClick={() => openModal(order)}
                  className="bg-green-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-green-700 hover:scale-105 transition"
                >
                  View
                </button>
              </div>
            </div>
          );
        }) : (
          <p className="text-center text-gray-400 text-lg">No orders found.</p>
        )}
      </div>

      {/* Large Screens - Table */}
      <div className="hidden lg:block overflow-x-auto mt-6">
        <table className="min-w-full bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-800 font-semibold">Products</th>
              <th className="px-6 py-3 text-left text-gray-800 font-semibold">Shipping</th>
              <th className="px-6 py-3 text-left text-gray-800 font-semibold">Payment</th>
              <th className="px-6 py-3 text-left text-gray-800 font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-gray-800 font-semibold">Total</th>
              <th className="px-6 py-3 text-left text-gray-800 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? orders.map(order => {
              const cartItems = JSON.parse(order.cart);
              const shipping = JSON.parse(order.shippingInfo);

              return (
                <tr key={order.$id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-2">
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <img src={item.image} alt={item.productName || item.name} className="w-14 h-14 object-cover rounded-lg" />
                          <div>
                            <p className="text-gray-800 font-semibold">{item.productName || item.name}</p>
                            <p className="text-gray-400 text-sm">Qty: {item.quantity || 1}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-800">{shipping.firstName} {shipping.lastName}</p>
                    <p className="text-gray-400 text-sm">{shipping.phone}</p>
                    <p className="text-gray-400 text-sm">{shipping.address}, {shipping.region}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-800">{order.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-green-600 font-bold">{formatCurrency(order.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(order)}
                      className="bg-green-600 text-white px-4 py-1 rounded-xl shadow hover:bg-green-700 hover:scale-105 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Order Details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-900 text-3xl font-bold">&times;</button>
            </div>

            {/* Product Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {JSON.parse(selectedOrder.cart).map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-2xl hover:shadow-md transition">
                  <img src={item.image} alt={item.productName || item.name} className="w-24 h-24 object-cover rounded-xl" />
                  <div>
                    <p className="text-gray-900 font-semibold">{item.productName || item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity || 1}</p>
                    <p className="text-green-600 font-bold">{formatCurrency((item.price01 || item.price) * (item.quantity || 1))}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl grid grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
              {Object.entries(JSON.parse(selectedOrder.shippingInfo)).map(([key, value]) => (
                <React.Fragment key={key}>
                  <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                  <p>{value}</p>
                </React.Fragment>
              ))}
            </div>

            {/* Payment & Status */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl grid grid-cols-2 gap-x-6 gap-y-2 text-gray-900">
              <p className="font-semibold">Payment Method:</p>
              <p>{selectedOrder.paymentMethod}</p>

              <p className="font-semibold">Status:</p>
              <p>{selectedOrder.status}</p>

              <p className="font-semibold">Total:</p>
              <p className="text-green-600 font-bold">{formatCurrency(selectedOrder.totalAmount)}</p>
            </div>

            {/* Close Button */}
            <div className="text-right">
              <button
                onClick={closeModal}
                className="bg-green-600 text-white px-6 py-2 rounded-2xl shadow-lg hover:bg-green-700 hover:scale-105 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
