import React from "react";

const Cart = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600">
            This page will show the shopping cart with items, quantities, and
            checkout options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

