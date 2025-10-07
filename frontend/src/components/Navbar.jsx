import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  Search,
  ChefHat,
  Settings,
} from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems, toggleCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/vendors?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const getDashboardLink = () => {
    if (!user) return null;

    switch (user.role) {
      case "vendor":
        return "/vendor-dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/orders";
    }
  };

  const getDashboardLabel = () => {
    if (!user) return "";

    switch (user.role) {
      case "vendor":
        return "Vendor Dashboard";
      case "admin":
        return "Admin Dashboard";
      default:
        return "My Orders";
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">
              Flying Chicken
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            {isAuthenticated && user?.role === "customer" && (
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            )}

            {/* Dashboard Link */}
            {isAuthenticated && (
              <Link
                to={getDashboardLink()}
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                {getDashboardLabel()}
              </Link>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden lg:block">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden lg:block">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Cart - Mobile */}
              {isAuthenticated && user?.role === "customer" && (
                <button
                  onClick={() => {
                    toggleCart();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart ({totalItems})</span>
                </button>
              )}

              {/* Dashboard Link - Mobile */}
              {isAuthenticated && (
                <Link
                  to={getDashboardLink()}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                >
                  {getDashboardLabel()}
                </Link>
              )}

              {/* Profile Link - Mobile */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

