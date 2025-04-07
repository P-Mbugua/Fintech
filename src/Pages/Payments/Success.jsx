import React from 'react'
import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6 text-center">
        Thank you for your purchase. Your payment has been processed successfully.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Go to Home
        </Link>
        <Link
          to="/orders"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
        >
          View Orders
        </Link>
      </div>
    </div>
  )
}

export default Success
