const express = require("express");
const { body, validationResult } = require("express-validator");
const MenuItem = require("../models/MenuItem");
const Vendor = require("../models/Vendor");
const { verifyToken, authorize } = require("../middleware/auth");

const router = express.Router();

// Get menu items for a vendor
router.get("/vendor/:vendorId", async (req, res) => {
  try {
    const { category, vegetarian, available } = req.query;

    const query = { vendor: req.params.vendorId };

    if (category) {
      query.category = category;
    }

    if (vegetarian === "true") {
      query.isVegetarian = true;
    }

    if (available !== undefined) {
      query.isAvailable = available === "true";
    }

    const menuItems = await MenuItem.find(query)
      .populate("vendor", "restaurantName")
      .sort({ category: 1, name: 1 });

    res.json({
      success: true,
      data: { menuItems },
    });
  } catch (error) {
    console.error("Get menu items error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu items",
      error: error.message,
    });
  }
});

// Get single menu item
router.get("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate(
      "vendor",
      "restaurantName address contact"
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      data: { menuItem },
    });
  } catch (error) {
    console.error("Get menu item error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu item",
      error: error.message,
    });
  }
});

// Create menu item (vendor only)
router.post(
  "/",
  verifyToken,
  authorize("vendor"),
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Menu item name is required"),
    body("description")
      .trim()
      .isLength({ min: 10, max: 300 })
      .withMessage("Description must be between 10 and 300 characters"),
    body("category")
      .isIn([
        "appetizer",
        "main-course",
        "dessert",
        "beverage",
        "combo",
        "snacks",
      ])
      .withMessage("Invalid category"),
    body("price")
      .isNumeric()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("vendor").isMongoId().withMessage("Valid vendor ID is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      // Verify vendor ownership
      const vendor = await Vendor.findOne({
        _id: req.body.vendor,
        user: req.user._id,
      });

      if (!vendor) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to add menu items to this vendor",
        });
      }

      const menuItem = new MenuItem(req.body);
      await menuItem.save();

      await menuItem.populate("vendor", "restaurantName");

      res.status(201).json({
        success: true,
        message: "Menu item created successfully",
        data: { menuItem },
      });
    } catch (error) {
      console.error("Create menu item error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create menu item",
        error: error.message,
      });
    }
  }
);

// Update menu item
router.put(
  "/:id",
  verifyToken,
  authorize("vendor"),
  [
    body("name").optional().trim().isLength({ min: 2, max: 100 }),
    body("description").optional().trim().isLength({ min: 10, max: 300 }),
    body("category")
      .optional()
      .isIn([
        "appetizer",
        "main-course",
        "dessert",
        "beverage",
        "combo",
        "snacks",
      ]),
    body("price").optional().isNumeric().isFloat({ min: 0 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const menuItem = await MenuItem.findById(req.params.id);

      if (!menuItem) {
        return res.status(404).json({
          success: false,
          message: "Menu item not found",
        });
      }

      // Verify vendor ownership
      const vendor = await Vendor.findOne({
        _id: menuItem.vendor,
        user: req.user._id,
      });

      if (!vendor) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this menu item",
        });
      }

      // Update menu item data
      Object.keys(req.body).forEach((key) => {
        if (req.body[key] !== undefined) {
          menuItem[key] = req.body[key];
        }
      });

      await menuItem.save();
      await menuItem.populate("vendor", "restaurantName");

      res.json({
        success: true,
        message: "Menu item updated successfully",
        data: { menuItem },
      });
    } catch (error) {
      console.error("Update menu item error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update menu item",
        error: error.message,
      });
    }
  }
);

// Delete menu item
router.delete("/:id", verifyToken, authorize("vendor"), async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    // Verify vendor ownership
    const vendor = await Vendor.findOne({
      _id: menuItem.vendor,
      user: req.user._id,
    });

    if (!vendor) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this menu item",
      });
    }

    await MenuItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    console.error("Delete menu item error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete menu item",
      error: error.message,
    });
  }
});

// Toggle menu item availability
router.put(
  "/:id/availability",
  verifyToken,
  authorize("vendor"),
  [
    body("isAvailable")
      .isBoolean()
      .withMessage("Availability status must be boolean"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const menuItem = await MenuItem.findById(req.params.id);

      if (!menuItem) {
        return res.status(404).json({
          success: false,
          message: "Menu item not found",
        });
      }

      // Verify vendor ownership
      const vendor = await Vendor.findOne({
        _id: menuItem.vendor,
        user: req.user._id,
      });

      if (!vendor) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this menu item",
        });
      }

      menuItem.isAvailable = req.body.isAvailable;
      await menuItem.save();

      res.json({
        success: true,
        message: `Menu item ${
          req.body.isAvailable ? "made available" : "made unavailable"
        }`,
        data: { menuItem },
      });
    } catch (error) {
      console.error("Toggle availability error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update menu item availability",
        error: error.message,
      });
    }
  }
);

// Search menu items across all vendors
router.get("/search/all", async (req, res) => {
  try {
    const {
      q,
      category,
      vegetarian,
      maxPrice,
      minPrice,
      page = 1,
      limit = 20,
    } = req.query;

    const query = { isAvailable: true };

    // Text search
    if (q) {
      query.$text = { $search: q };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Vegetarian filter
    if (vegetarian === "true") {
      query.isVegetarian = true;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const menuItems = await MenuItem.find(query)
      .populate("vendor", "restaurantName address rating")
      .sort(q ? { score: { $meta: "textScore" } } : { "rating.average": -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await MenuItem.countDocuments(query);

    res.json({
      success: true,
      data: {
        menuItems,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    console.error("Search menu items error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search menu items",
      error: error.message,
    });
  }
});

module.exports = router;

