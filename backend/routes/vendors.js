const express = require("express");
const { body, validationResult } = require("express-validator");
const Vendor = require("../models/Vendor");
const User = require("../models/User");
const { verifyToken, authorize } = require("../middleware/auth");

const router = express.Router();

// Get all vendors (public)
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      cuisine,
      search,
      subscription = "all",
      sortBy = "rating",
    } = req.query;

    const query = { isApproved: true, isActive: true };

    // Filter by city
    if (city) {
      query["address.city"] = new RegExp(city, "i");
    }

    // Filter by cuisine
    if (cuisine) {
      query.cuisine = { $in: cuisine.split(",") };
    }

    // Search in restaurant name, description, and cuisine
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by subscription tier
    if (subscription !== "all") {
      query["subscription.plan"] = subscription;
    }

    // Sort options
    let sort = {};
    switch (sortBy) {
      case "rating":
        sort = { "rating.average": -1, "subscription.plan": -1 };
        break;
      case "newest":
        sort = { createdAt: -1 };
        break;
      case "name":
        sort = { restaurantName: 1 };
        break;
      case "subscription":
        sort = { "subscription.plan": -1, "rating.average": -1 };
        break;
      default:
        sort = { "rating.average": -1, "subscription.plan": -1 };
    }

    const vendors = await Vendor.find(query)
      .populate("user", "name email phone")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Vendor.countDocuments(query);

    res.json({
      success: true,
      data: {
        vendors,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    console.error("Get vendors error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vendors",
      error: error.message,
    });
  }
});

// Get single vendor by ID
router.get("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate(
      "user",
      "name email phone"
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.json({
      success: true,
      data: { vendor },
    });
  } catch (error) {
    console.error("Get vendor error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vendor",
      error: error.message,
    });
  }
});

// Create vendor profile (vendor only)
router.post(
  "/",
  verifyToken,
  authorize("vendor"),
  [
    body("restaurantName")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Restaurant name is required"),
    body("description")
      .trim()
      .isLength({ min: 10, max: 500 })
      .withMessage("Description must be between 10 and 500 characters"),
    body("cuisine")
      .isArray({ min: 1 })
      .withMessage("At least one cuisine type is required"),
    body("address.street")
      .trim()
      .notEmpty()
      .withMessage("Street address is required"),
    body("address.city").trim().notEmpty().withMessage("City is required"),
    body("address.state").trim().notEmpty().withMessage("State is required"),
    body("address.pincode")
      .matches(/^[0-9]{6}$/)
      .withMessage("Please provide a valid 6-digit pincode"),
    body("contact.phone")
      .matches(/^[0-9]{10}$/)
      .withMessage("Please provide a valid 10-digit phone number"),
    body("contact.email")
      .isEmail()
      .withMessage("Please provide a valid contact email"),
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

      // Check if vendor profile already exists
      const existingVendor = await Vendor.findOne({ user: req.user._id });
      if (existingVendor) {
        return res.status(400).json({
          success: false,
          message: "Vendor profile already exists",
        });
      }

      const vendorData = {
        user: req.user._id,
        ...req.body,
      };

      const vendor = new Vendor(vendorData);
      await vendor.save();

      await vendor.populate("user", "name email phone");

      res.status(201).json({
        success: true,
        message: "Vendor profile created successfully",
        data: { vendor },
      });
    } catch (error) {
      console.error("Create vendor error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create vendor profile",
        error: error.message,
      });
    }
  }
);

// Update vendor profile
router.put(
  "/:id",
  verifyToken,
  authorize("vendor"),
  [
    body("restaurantName").optional().trim().isLength({ min: 2, max: 100 }),
    body("description").optional().trim().isLength({ min: 10, max: 500 }),
    body("cuisine").optional().isArray({ min: 1 }),
    body("address.pincode")
      .optional()
      .matches(/^[0-9]{6}$/),
    body("contact.phone")
      .optional()
      .matches(/^[0-9]{10}$/),
    body("contact.email").optional().isEmail(),
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

      const vendor = await Vendor.findById(req.params.id);

      if (!vendor) {
        return res.status(404).json({
          success: false,
          message: "Vendor not found",
        });
      }

      // Check if user owns this vendor profile
      if (vendor.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this vendor profile",
        });
      }

      // Update vendor data
      Object.keys(req.body).forEach((key) => {
        if (req.body[key] !== undefined) {
          vendor[key] = req.body[key];
        }
      });

      await vendor.save();
      await vendor.populate("user", "name email phone");

      res.json({
        success: true,
        message: "Vendor profile updated successfully",
        data: { vendor },
      });
    } catch (error) {
      console.error("Update vendor error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update vendor profile",
        error: error.message,
      });
    }
  }
);

// Update subscription plan
router.put(
  "/:id/subscription",
  verifyToken,
  authorize("vendor"),
  [
    body("plan")
      .isIn(["free", "mid", "premium"])
      .withMessage("Invalid subscription plan"),
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

      const vendor = await Vendor.findById(req.params.id);

      if (!vendor) {
        return res.status(404).json({
          success: false,
          message: "Vendor not found",
        });
      }

      // Check if user owns this vendor profile
      if (vendor.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this vendor subscription",
        });
      }

      const { plan } = req.body;

      // Update subscription
      vendor.subscription.plan = plan;
      vendor.subscription.startDate = new Date();

      // Set end date based on plan
      const endDate = new Date();
      if (plan === "mid") {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (plan === "premium") {
        endDate.setMonth(endDate.getMonth() + 1);
      }

      vendor.subscription.endDate = endDate;
      vendor.subscription.isActive = true;

      await vendor.save();

      res.json({
        success: true,
        message: "Subscription updated successfully",
        data: {
          subscription: vendor.subscription,
        },
      });
    } catch (error) {
      console.error("Update subscription error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update subscription",
        error: error.message,
      });
    }
  }
);

// Admin routes for vendor management
router.get(
  "/admin/pending",
  verifyToken,
  authorize("admin"),
  async (req, res) => {
    try {
      const vendors = await Vendor.find({ isApproved: false })
        .populate("user", "name email phone")
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: { vendors },
      });
    } catch (error) {
      console.error("Get pending vendors error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch pending vendors",
        error: error.message,
      });
    }
  }
);

// Approve/reject vendor
router.put(
  "/admin/:id/approve",
  verifyToken,
  authorize("admin"),
  [
    body("isApproved")
      .isBoolean()
      .withMessage("Approval status must be boolean"),
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

      const vendor = await Vendor.findById(req.params.id);

      if (!vendor) {
        return res.status(404).json({
          success: false,
          message: "Vendor not found",
        });
      }

      vendor.isApproved = req.body.isApproved;
      await vendor.save();

      res.json({
        success: true,
        message: `Vendor ${
          req.body.isApproved ? "approved" : "rejected"
        } successfully`,
        data: { vendor },
      });
    } catch (error) {
      console.error("Approve vendor error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update vendor approval",
        error: error.message,
      });
    }
  }
);

module.exports = router;

