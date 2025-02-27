import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers for authentication, cart management, and theme handling
// import { AuthProvider } from './Context/AuthContext';
// import { CartProvider } from './contexts/CartContext';
// import { ThemeProvider } from './contexts/ThemeContext';

// Layout components for different sections of the application
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages inside the "home" folder
import Home from './pages/home/Home';

// Authentication-related pages inside the "auth" folder
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Dashboard components inside the "dashboard" folder
import Dashboard from './components/dashboard/Dashboard';

// Cart-related pages inside the "cart" folder
import Cart from './pages/cart/Cart';

// Order-related pages inside the "orders" folder
import OrderHistory from './pages/orders/OrderHistory';
import OrderDetails from './pages/orders/OrderDetails';

// Payment-related pages inside the "payments" folder
import Checkout from './pages/payments/Checkout';
import Payment from './pages/payments/Payment';
import Success from './pages/payments/Success';

// User profile and settings pages inside the "user" folder
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';

function App() {
  return (
    // Wrapping the entire app with context providers
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              {/* Routes wrapped in the Main Layout */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Authentication routes wrapped in Auth Layout */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
              </Route>

              {/* Dashboard routes wrapped in Dashboard Layout */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
              </Route>

              {/* Payment-related standalone routes */}
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
