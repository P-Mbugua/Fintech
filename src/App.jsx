import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context Providers
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import { ThemeProvider } from "./Context/ThemeContext";

// Layouts
import AuthLayout from "./Layouts/AuthLayout";
import DashboardLayout from "./Layouts/DashboardLayout";
import MainLayout from "./Layouts/MainLayout";

// Authentication Pages (Public)
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";

// Public Pages
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";

// Order Pages (Protected)
import OrderHistory from "./Pages/Orders/OrderHistory";
import OrderDetails from "./Pages/Orders/OrderDetails";

// Payment Pages (Protected)
import Checkout from "./Pages/Payments/Checkout";
import Payments from "./Pages/Payments/Payments";
import Success from "./Pages/Payments/Success";

// User Profile & Settings (Protected)
import Profile from "./Pages/User/Profile";
import Settings from "./Pages/User/Settings";

// Dashboard (Protected)
import Dashboard from "./components/Dashboard/Dashboard";

// Route Protection
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              {/* Public Routes (No authentication required) */}
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
              <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
              <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
              <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />

              {/* Protected Routes (Require Authentication) */}
              <Route path="/orders" element={
                <ProtectedRoute><DashboardLayout><OrderHistory /></DashboardLayout></ProtectedRoute>
              } />
              <Route path="/orders/:id" element={
                <ProtectedRoute><DashboardLayout><OrderDetails /></DashboardLayout></ProtectedRoute>
              } />

              <Route path="/checkout" element={
                <ProtectedRoute><DashboardLayout><Checkout /></DashboardLayout></ProtectedRoute>
              } />
              <Route path="/payments" element={
                <ProtectedRoute><DashboardLayout><Payments /></DashboardLayout></ProtectedRoute>
              } />
              <Route path="/payment-success" element={
                <ProtectedRoute><DashboardLayout><Success /></DashboardLayout></ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>
              } />

              <Route path="/dashboard" element={
                <ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>
              } />
            </Routes>
          </Router>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
