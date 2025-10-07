import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, Truck, Shield, Zap, Users } from "lucide-react";
import api from "../utils/api";

const Home = () => {
  const [featuredVendors, setFeaturedVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedVendors = async () => {
      try {
        const response = await api.get("/vendors?limit=6&sortBy=rating");
        setFeaturedVendors(response.data.data.vendors);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedVendors();
  }, []);

  const features = [
    {
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      title: "Fast Delivery",
      description: "Get your food delivered in 30 minutes or less",
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Safe & Secure",
      description: "Your data and payments are completely secure",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Easy Ordering",
      description: "Order from thousands of restaurants in just a few clicks",
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Trusted by Millions",
      description: "Join millions of satisfied customers across India",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Favorite Food,
              <br />
              <span className="text-yellow-300">Delivered Fast</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Order from thousands of restaurants across India with Flying
              Chicken
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/vendors"
                className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Order Now
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors"
              >
                Join as Vendor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Flying Chicken?
            </h2>
            <p className="text-gray-600 text-lg">
              We make food delivery simple, fast, and reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Restaurants
            </h2>
            <p className="text-gray-600 text-lg">
              Discover the best restaurants in your area
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
                >
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVendors.map((vendor) => (
                <Link
                  key={vendor._id}
                  to={`/vendor/${vendor._id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {vendor.images?.banner ? (
                      <img
                        src={vendor.images.banner}
                        alt={vendor.restaurantName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
                        <p>No image available</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {vendor.restaurantName}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {vendor.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">
                          {vendor.rating?.average?.toFixed(1) || "4.0"}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({vendor.rating?.count || 0})
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          {vendor.estimatedDeliveryTime} min
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {vendor.cuisine?.slice(0, 2).map((cuisine, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full"
                        >
                          {cuisine}
                        </span>
                      ))}
                      {vendor.cuisine?.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{vendor.cuisine.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/vendors" className="btn-primary">
              View All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Join thousands of satisfied customers and start ordering today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up Now
            </Link>
            <Link
              to="/vendors"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors"
            >
              Browse Restaurants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

