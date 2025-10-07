import React from "react";
import { Link } from "react-router-dom";
import {
  ChefHat,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Flying Chicken</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your favorite food delivery app with the best restaurants and
              fastest delivery. Order from thousands of restaurants across
              India.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/vendors"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* For Vendors */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Vendors</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/vendor-register"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Partner with Us
                </Link>
              </li>
              <li>
                <Link
                  to="/vendor-login"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Vendor Login
                </Link>
              </li>
              <li>
                <Link
                  to="/vendor-pricing"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/vendor-support"
                  className="text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Vendor Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-gray-300">
                  Mumbai, Maharashtra, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-gray-300">support@flyingchicken.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Flying Chicken. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

