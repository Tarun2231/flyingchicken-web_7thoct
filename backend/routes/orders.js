const express = require("express");
const { body, validationResult } = require("express-validator");
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const Vendor = require("../models/Vendor");
const { verifyToken, authorize } = require("../middleware/auth");

const router = express.Router();

// Create new order
router.post(
  "/",
  verifyToken,
  authorize("customer"),
  [
    body("vendor").isMongoId().withMessage("Valid vendor ID is required"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("At least one item is required"),
    body("items.*.menuItem")
      .isMongoId()
      .withMessage("Valid menu item ID is required"),
    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
    body("deliveryAddress.street")
      .trim()
      .notEmpty()
      .withMessage("Street address is required"),
    body("deliveryAddress.city")
      .trim()
      .notEmpty()
      .withMessage("City is required"),
    body("deliveryAddress.state")
      .trim()
      .notEmpty()
      .withMessage("State is required"),
    body("deliveryAddress.pincode")
      .matches(/^[0-9]{6}$/)
      .withMessage("Please provide a valid 6-digit pincode"),
    body("contactInfo.phone")
      .matches(/^[0-9]{10}$/)
      .withMessage("Please provide a valid 10-digit phone number"),
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

      const {
        vendor,
        items,
        deliveryAddress,
        contactInfo,
        specialInstructions,
        deliveryType = "delivery",
      } = req.body;

      // Verify vendor exists and is active
      const vendorDoc = await Vendor.findById(vendor);
      if (!vendorDoc || !vendorDoc.isApproved || !vendorDoc.isActive) {
        return res.status(400).json({
          success: false,
          message: "Vendor not available for orders",
        });
      }

      // Validate and calculate pricing for each item
      let subtotal = 0;
      const validatedItems = [];

      for (const item of items) {
        const menuItem = await MenuItem.findById(item.menuItem);
        if (!menuItem || !menuItem.isAvailable) {
          return res.status(400).json({
            success: false,
            message: `Menu item ${item.menuItem} is not available`,
          });
        }

        // Calculate item total including variants and addons
        let itemPrice = menuItem.price;

        if (item.variant) {
          const variant = menuItem.variants.find(
            (v) => v.name === item.variant.name
          );
          if (variant) {
            itemPrice = variant.price;
          }
        }

        if (item.addons && item.addons.length > 0) {
          for (const addon of item.addons) {
            const addonOption = menuItem.addons.find(
              (a) => a.name === addon.name
            );
            if (addonOption) {
              itemPrice += addonOption.price;
            }
          }
        }

        const itemTotal = itemPrice * item.quantity;
        subtotal += itemTotal;

        validatedItems.push({
          menuItem: menuItem._id,
          name: menuItem.name,
          price: itemPrice,
          quantity: item.quantity,
          variant: item.variant,
          addons: item.addons,
          specialInstructions: item.specialInstructions,
        });
      }

      // Calculate delivery fee
      const deliveryFee =
        deliveryType === "delivery" ? vendorDoc.deliveryFee : 0;

      // Calculate tax (assuming 5% GST)
      const tax = subtotal * 0.05;

      // Calculate total
      const total = subtotal + deliveryFee + tax;

      // Create order
      const order = new Order({
        customer: req.user._id,
        vendor: vendor,
        items: validatedItems,
        pricing: {
          subtotal,
          deliveryFee,
          tax,
          total,
        },
        deliveryAddress,
        contactInfo,
        specialInstructions,
        deliveryType,
        estimatedDeliveryTime: new Date(
          Date.now() + vendorDoc.estimatedDeliveryTime * 60000
        ),
      });

      await order.save();

      // Add to timeline
      order.timeline.push({
        status: "placed",
        timestamp: new Date(),
        note: "Order placed successfully",
      });

      await order.save();

      await order.populate([
        { path: "customer", select: "name email phone" },
        { path: "vendor", select: "restaurantName contact" },
        { path: "items.menuItem", select: "name image" },
      ]);

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: { order },
      });
    } catch (error) {
      console.error("Create order error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message,
      });
    }
  }
);

// Get customer orders
router.get(
  "/customer",
  verifyToken,
  authorize("customer"),
  async (req, res) => {
    try {
      const { page = 1, limit = 10, status } = req.query;

      const query = { customer: req.user._id };
      if (status) {
        query.status = status;
      }

      const orders = await Order.find(query)
        .populate("vendor", "restaurantName images.logo")
        .populate("items.menuItem", "name image")
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Order.countDocuments(query);

      res.json({
        success: true,
        data: {
          orders,
          pagination: {
            current: parseInt(page),
            pages: Math.ceil(total / limit),
            total,
          },
        },
      });
    } catch (error) {
      console.error("Get customer orders error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
        error: error.message,
      });
    }
  }
);

// Get vendor orders
router.get("/vendor", verifyToken, authorize("vendor"), async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    // Find vendor owned by user
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor profile not found",
      });
    }

    const query = { vendor: vendor._id };
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate("customer", "name phone")
      .populate("items.menuItem", "name image")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    console.error("Get vendor orders error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// Get single order
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("vendor", "restaurantName contact address")
      .populate("items.menuItem", "name image description");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check authorization
    const isCustomer =
      req.user.role === "customer" &&
      order.customer._id.toString() === req.user._id.toString();
    const isVendor = req.user.role === "vendor";
    const isAdmin = req.user.role === "admin";

    if (!isCustomer && !isVendor && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    // If vendor, check if they own this order
    if (isVendor) {
      const vendor = await Vendor.findOne({ user: req.user._id });
      if (!vendor || vendor._id.toString() !== order.vendor._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to view this order",
        });
      }
    }

    res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});

// Update order status (vendor only)
router.put(
  "/:id/status",
  verifyToken,
  authorize("vendor"),
  [
    body("status")
      .isIn([
        "placed",
        "confirmed",
        "preparing",
        "ready",
        "out-for-delivery",
        "delivered",
        "cancelled",
      ])
      .withMessage("Invalid status"),
    body("note").optional().trim(),
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

      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Verify vendor ownership
      const vendor = await Vendor.findOne({ user: req.user._id });
      if (!vendor || vendor._id.toString() !== order.vendor.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this order",
        });
      }

      const { status, note } = req.body;
      const oldStatus = order.status;

      order.status = status;

      // Add to timeline
      order.timeline.push({
        status,
        timestamp: new Date(),
        note: note || `Order status changed from ${oldStatus} to ${status}`,
      });

      // Set actual delivery time if delivered
      if (status === "delivered") {
        order.actualDeliveryTime = new Date();
      }

      await order.save();

      res.json({
        success: true,
        message: "Order status updated successfully",
        data: { order },
      });
    } catch (error) {
      console.error("Update order status error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update order status",
        error: error.message,
      });
    }
  }
);

// Cancel order (customer only)
router.put(
  "/:id/cancel",
  verifyToken,
  authorize("customer"),
  [body("reason").optional().trim()],
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Check if customer owns this order
      if (order.customer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to cancel this order",
        });
      }

      // Check if order can be cancelled
      if (["delivered", "cancelled"].includes(order.status)) {
        return res.status(400).json({
          success: false,
          message: "Order cannot be cancelled",
        });
      }

      order.status = "cancelled";

      // Add to timeline
      order.timeline.push({
        status: "cancelled",
        timestamp: new Date(),
        note: req.body.reason || "Order cancelled by customer",
      });

      await order.save();

      res.json({
        success: true,
        message: "Order cancelled successfully",
        data: { order },
      });
    } catch (error) {
      console.error("Cancel order error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to cancel order",
        error: error.message,
      });
    }
  }
);

// Rate order (customer only)
router.post(
  "/:id/rate",
  verifyToken,
  authorize("customer"),
  [
    body("food")
      .isInt({ min: 1, max: 5 })
      .withMessage("Food rating must be between 1 and 5"),
    body("delivery")
      .isInt({ min: 1, max: 5 })
      .withMessage("Delivery rating must be between 1 and 5"),
    body("overall")
      .isInt({ min: 1, max: 5 })
      .withMessage("Overall rating must be between 1 and 5"),
    body("review").optional().trim(),
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

      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Check if customer owns this order
      if (order.customer.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to rate this order",
        });
      }

      // Check if order is delivered
      if (order.status !== "delivered") {
        return res.status(400).json({
          success: false,
          message: "Can only rate delivered orders",
        });
      }

      const { food, delivery, overall, review } = req.body;

      order.rating = {
        food,
        delivery,
        overall,
        review,
      };

      await order.save();

      res.json({
        success: true,
        message: "Order rated successfully",
        data: { order },
      });
    } catch (error) {
      console.error("Rate order error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to rate order",
        error: error.message,
      });
    }
  }
);

// Get all orders (admin only)
router.get("/admin/all", verifyToken, authorize("admin"), async (req, res) => {
  try {
    const { page = 1, limit = 20, status, vendor } = req.query;

    const query = {};
    if (status) query.status = status;
    if (vendor) query.vendor = vendor;

    const orders = await Order.find(query)
      .populate("customer", "name email phone")
      .populate("vendor", "restaurantName")
      .populate("items.menuItem", "name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

module.exports = router;

