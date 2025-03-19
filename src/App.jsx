import React, { useState, useEffect } from "react";
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

// Common pages
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Contact from "./components/Common/Contact";
import LiveChat from "./components/Common/LiveChat";
import AboutUs from "./components/Common/AboutUs";

// Public Pages
import Home from "./Pages/Home/Home";
import HotSales from "./Pages/Home/HotSales";
import HotCattegories from "./Pages/Home/HotCattegories";
import Cart from "./Pages/Cart/Cart";
import Banner from "./Pages/Home/Banner";
import Reccomended from "./Pages/Home/Reccomended";
import ProductsPage from "./Pages/Home/ProductsPage";

// Phone and Accessories 
import PhoneandAccessories from "./Pages/Phoneand Accessories/PhoneandAccessories";

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

// Loader Component
import FintechLoader from "./components/Common/FintechLoader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading time
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Loader will show for 2 seconds
  }, []);

  if (loading) {
    return <FintechLoader />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              {/* Public Routes (No authentication required) */}
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/banner" element={<MainLayout><Banner /></MainLayout>} />
              <Route path="/hot-sales" element={<MainLayout><HotSales /></MainLayout>} />
              <Route path="/products" element={<MainLayout><ProductsPage /></MainLayout>} />
              <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
              <Route path= "/recommended" element={<MainLayout><Reccomended /></MainLayout>} />
              <Route path="/hot-cattegories" element={<MainLayout><HotCattegories /></MainLayout>} />
              <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
              <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
              <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
              <Route path="/contact" element={<DashboardLayout><Contact /></DashboardLayout>} />
              <Route path="/about" element={<DashboardLayout><AboutUs /></DashboardLayout>}/>
              <Route path="/PhoneandAccessories" element={<DashboardLayout><PhoneandAccessories /></DashboardLayout>} />
              <Route path="/header" element={<Header />} />
              <Route path="/footer" element={<Footer />} />

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
          <LiveChat />
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
