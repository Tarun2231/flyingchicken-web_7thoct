const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      trim: true,
      maxlength: [100, "Menu item name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [300, "Description cannot exceed 300 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "appetizer",
        "main-course",
        "dessert",
        "beverage",
        "combo",
        "snacks",
      ],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    image: {
      type: String,
      default: "",
    },
    ingredients: [String],
    allergens: [String],
    nutritionInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      fiber: Number,
    },
    isVegetarian: {
      type: Boolean,
      default: false,
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
    isSpicy: {
      type: Boolean,
      default: false,
    },
    spiceLevel: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    preparationTime: {
      type: Number,
      default: 15,
      min: 5,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
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
    tags: [String],
    variants: [
      {
        name: String,
        price: Number,
        isDefault: { type: Boolean, default: false },
      },
    ],
    addons: [
      {
        name: String,
        price: Number,
        isRequired: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
menuItemSchema.index({ name: "text", description: "text", category: 1 });
menuItemSchema.index({ vendor: 1, category: 1 });
menuItemSchema.index({ vendor: 1, isAvailable: 1 });

module.exports = mongoose.model("MenuItem", menuItemSchema);

