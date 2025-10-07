const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/flying-chicken",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/vendors", require("./routes/vendors"));
app.use("/api/menus", require("./routes/menus"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/chat", require("./routes/chat"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Flying Chicken API is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Flying Chicken server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;

