const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantName: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
      maxlength: [100, "Restaurant name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Restaurant description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    cuisine: {
      type: [String],
      required: [true, "Cuisine type is required"],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one cuisine type is required",
      },
    },
    address: {
      street: {
        type: String,
        required: [true, "Street address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      pincode: {
        type: String,
        required: [true, "Pincode is required"],
        match: [/^[0-9]{6}$/, "Please enter a valid 6-digit pincode"],
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    contact: {
      phone: {
        type: String,
        required: [true, "Contact phone is required"],
        match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
      },
      email: {
        type: String,
        required: [true, "Contact email is required"],
        lowercase: true,
      },
    },
    timings: {
      openTime: {
        type: String,
        required: [true, "Opening time is required"],
        default: "09:00",
      },
      closeTime: {
        type: String,
        required: [true, "Closing time is required"],
        default: "23:00",
      },
      isOpen: {
        type: Boolean,
        default: true,
      },
    },
    images: {
      logo: {
        type: String,
        default: "",
      },
      banner: {
        type: String,
        default: "",
      },
      gallery: [String],
    },
    subscription: {
      plan: {
        type: String,
        enum: ["free", "mid", "premium"],
        default: "free",
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
      endDate: Date,
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    minimumOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
    estimatedDeliveryTime: {
      type: Number,
      default: 30,
      min: 15,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    features: {
      delivery: {
        type: Boolean,
        default: true,
      },
      pickup: {
        type: Boolean,
        default: true,
      },
      dineIn: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
vendorSchema.index({
  restaurantName: "text",
  description: "text",
  cuisine: "text",
});
vendorSchema.index({ "address.city": 1 });
vendorSchema.index({ subscription: 1, isApproved: 1, isActive: 1 });

module.exports = mongoose.model("Vendor", vendorSchema);

