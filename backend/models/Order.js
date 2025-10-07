const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        variant: {
          name: String,
          price: Number,
        },
        addons: [
          {
            name: String,
            price: Number,
          },
        ],
        specialInstructions: String,
      },
    ],
    pricing: {
      subtotal: {
        type: Number,
        required: true,
        min: 0,
      },
      deliveryFee: {
        type: Number,
        default: 0,
        min: 0,
      },
      tax: {
        type: Number,
        default: 0,
        min: 0,
      },
      discount: {
        type: Number,
        default: 0,
        min: 0,
      },
      total: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    deliveryAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      landmark: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    contactInfo: {
      phone: {
        type: String,
        required: true,
      },
      alternatePhone: String,
    },
    status: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "preparing",
        "ready",
        "out-for-delivery",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online", "wallet"],
      default: "cod",
    },
    deliveryType: {
      type: String,
      enum: ["delivery", "pickup"],
      default: "delivery",
    },
    estimatedDeliveryTime: {
      type: Date,
    },
    actualDeliveryTime: {
      type: Date,
    },
    specialInstructions: String,
    notes: String,
    timeline: [
      {
        status: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        note: String,
      },
    ],
    rating: {
      food: {
        type: Number,
        min: 1,
        max: 5,
      },
      delivery: {
        type: Number,
        min: 1,
        max: 5,
      },
      overall: {
        type: Number,
        min: 1,
        max: 5,
      },
      review: String,
    },
  },
  {
    timestamps: true,
  }
);

// Generate order number before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `FC${String(count + 1).padStart(6, "0")}`;
  }
  next();
});

// Index for better query performance
orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ vendor: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderNumber: 1 });

module.exports = mongoose.model("Order", orderSchema);

