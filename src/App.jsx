import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context Providers
import AuthContext from "./Context/AuthContext"; // Provides authentication-related context
import CartContext from "./Context/CartContext"; // Manages shopping cart state
import ThemeContext from "./Context/ThemeContext"; // Manages theme (dark/light mode)

// Custom Hooks
import UseAuth from "./Hooks/UseAuth"; // Hook to manage authentication logic
import UseCart from "./Hooks/UseCart"; // Hook to manage cart operations

// Layouts
import AuthLayout from "./Layouts/AuthLayout"; // Layout for authentication pages
import DashboardLayout from "./Layouts/DashboardLayout"; // Layout for dashboard pages
import MainLayout from "./Layouts/MainLayout"; // Main layout for general pages

// Authentication Pages
import Login from "./Pages/Auth/Login"; // User login page
import Register from "./Pages/Auth/Register"; // User registration page
import ForgotPassword from "./Pages/Auth/ForgotPassword"; // Password recovery page

// Home & Main Pages
import Home from "./Pages/Home/Home"; // Homepage
import Cart from "./Pages/Cart/Cart"; // Shopping cart page

// Order Pages
import OrderHistory from "./Pages/Orders/OrderHistory"; // View past orders
import OrderDetails from "./Pages/Orders/OrderDetails"; // View specific order details

// Payment Pages
import Checkout from "./Pages/Payments/Checkout"; // Checkout process page
import Payments from "./Pages/Payments/Payments"; // Payment methods and processing page
import Success from "./Pages/Payments/Success"; // Payment success confirmation page

// User Profile & Settings
import Profile from "./Pages/User/Profile"; // User profile page
import Settings from "./Pages/User/Settings"; // User settings page

// Dashboard
import Dashboard from "./components/Dashboard/Dashboard"; // Main dashboard component

// Services (Business Logic)
import AuthService from "./Services/AuthService"; // Handles user authentication API calls
import CartService from "./Services/CartService"; // Handles cart-related API calls
import PaymentService from "./Services/PaymentService"; // Handles payment transactions

// Utility Functions
import FormatCurrency from "./Utils/FormatCurrency"; // Formats numbers as currency
import ToastNotifications from "./Utils/ToastNotifications"; // Displays toast notifications
import ValidateEmail from "./Utils/ValidateEmail"; // Validates email format

function App() {
  return (
    <AuthContext.Provider value={UseAuth()}>
      <CartContext.Provider value={UseCart()}>
        <ThemeContext.Provider value={{ theme: "light" }}> {/* Example theme setup */}
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
              <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
              <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />

              {/* Order Routes */}
              <Route path="/orders" element={<DashboardLayout><OrderHistory /></DashboardLayout>} />
              <Route path="/orders/:id" element={<DashboardLayout><OrderDetails /></DashboardLayout>} />

              {/* Payment Routes */}
              <Route path="/checkout" element={<DashboardLayout><Checkout /></DashboardLayout>} />
              <Route path="/payments" element={<DashboardLayout><Payments /></DashboardLayout>} />
              <Route path="/payment-success" element={<DashboardLayout><Success /></DashboardLayout>} />

              {/* User Profile & Settings */}
              <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
              <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />

              {/* Dashboard */}
              <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            </Routes>
          </Router>
        </ThemeContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
