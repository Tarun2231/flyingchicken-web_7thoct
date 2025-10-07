import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Star, Clock, Filter, Search, MapPin } from "lucide-react";
import api from "../utils/api";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    city: "",
    cuisine: "",
    subscription: "all",
    sortBy: "rating",
  });

  useEffect(() => {
    fetchVendors();
  }, [filters]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (filters.search) queryParams.append("search", filters.search);
      if (filters.city) queryParams.append("city", filters.city);
      if (filters.cuisine) queryParams.append("cuisine", filters.cuisine);
      if (filters.subscription !== "all")
        queryParams.append("subscription", filters.subscription);
      if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);

      const response = await api.get(`/vendors?${queryParams.toString()}`);
      setVendors(response.data.data.vendors);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const cuisines = [
    "North Indian",
    "South Indian",
    "Chinese",
    "Italian",
    "Mexican",
    "Mughlai",
    "Tandoor",
    "Fast Food",
    "Desserts",
    "Beverages",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Restaurants Near You
          </h1>
          <p className="text-gray-600">
            Discover amazing restaurants and order your favorite food
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="label">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="label">City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter city"
                  value={filters.city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Cuisine */}
            <div>
              <label className="label">Cuisine</label>
              <select
                value={filters.cuisine}
                onChange={(e) => handleFilterChange("cuisine", e.target.value)}
                className="input-field"
              >
                <option value="">All Cuisines</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="label">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="input-field"
              >
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
                <option value="name">Name</option>
                <option value="subscription">Subscription</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
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
        ) : vendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
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
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {vendor.restaurantName}
                    </h3>
                    {vendor.subscription?.plan === "premium" && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Premium
                      </span>
                    )}
                  </div>

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

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{vendor.address.city}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Delivery: ₹{vendor.deliveryFee}
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
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setFilters({
                  search: "",
                  city: "",
                  cuisine: "",
                  subscription: "all",
                  sortBy: "rating",
                });
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorList;

