import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotButton from "./components/Chatbot/ChatbotButton";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorList from "./pages/VendorList";
import VendorDetail from "./pages/VendorDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="min-h-screen">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/vendors" element={<VendorList />} />
                <Route path="/vendor/:id" element={<VendorDetail />} />

                {/* Protected Routes */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      allowedRoles={["customer", "vendor", "admin"]}
                    >
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vendor-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["vendor"]}>
                      <VendorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            <Footer />
            <ChatbotButton />

            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: "#10B981",
                    secondary: "#fff",
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: "#EF4444",
                    secondary: "#fff",
                  },
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

