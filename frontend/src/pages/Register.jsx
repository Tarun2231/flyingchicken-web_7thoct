import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "customer",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.address.street.trim()) {
      newErrors["address.street"] = "Street address is required";
    }

    if (!formData.address.city.trim()) {
      newErrors["address.city"] = "City is required";
    }

    if (!formData.address.state.trim()) {
      newErrors["address.state"] = "State is required";
    }

    if (!formData.address.pincode) {
      newErrors["address.pincode"] = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.address.pincode)) {
      newErrors["address.pincode"] = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await register(formData);

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">FC</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="label">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field pl-10 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="label">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field pl-10 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="label">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input-field pl-10 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="label">
                Account Type
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="customer">Customer</option>
                <option value="vendor">Restaurant Owner</option>
              </select>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field pl-10 pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-field pl-10 pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Address Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Address Information
              </h3>

              <div>
                <label htmlFor="address.street" className="label">
                  Street Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="address.street"
                    name="address.street"
                    type="text"
                    value={formData.address.street}
                    onChange={handleChange}
                    className={`input-field pl-10 ${
                      errors["address.street"] ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your street address"
                  />
                </div>
                {errors["address.street"] && (
                  <p className="error-text">{errors["address.street"]}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address.city" className="label">
                    City
                  </label>
                  <input
                    id="address.city"
                    name="address.city"
                    type="text"
                    value={formData.address.city}
                    onChange={handleChange}
                    className={`input-field ${
                      errors["address.city"] ? "border-red-500" : ""
                    }`}
                    placeholder="City"
                  />
                  {errors["address.city"] && (
                    <p className="error-text">{errors["address.city"]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address.state" className="label">
                    State
                  </label>
                  <input
                    id="address.state"
                    name="address.state"
                    type="text"
                    value={formData.address.state}
                    onChange={handleChange}
                    className={`input-field ${
                      errors["address.state"] ? "border-red-500" : ""
                    }`}
                    placeholder="State"
                  />
                  {errors["address.state"] && (
                    <p className="error-text">{errors["address.state"]}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="address.pincode" className="label">
                  Pincode
                </label>
                <input
                  id="address.pincode"
                  name="address.pincode"
                  type="text"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  className={`input-field ${
                    errors["address.pincode"] ? "border-red-500" : ""
                  }`}
                  placeholder="Enter 6-digit pincode"
                />
                {errors["address.pincode"] && (
                  <p className="error-text">{errors["address.pincode"]}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <a href="#" className="text-orange-600 hover:text-orange-500">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-orange-600 hover:text-orange-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

