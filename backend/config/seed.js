const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// Load environment variables
dotenv.config();

// Import models
const User = require("./models/User");
const Vendor = require("./models/Vendor");
const MenuItem = require("./models/MenuItem");

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/flying-chicken"
    );
    console.log("MongoDB connected for seeding");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    console.log("🌱 Starting to seed database...");

    // Clear existing data
    await User.deleteMany({});
    await Vendor.deleteMany({});
    await MenuItem.deleteMany({});

    console.log("🗑️ Cleared existing data");

    // Create Admin User
    const adminUser = new User({
      name: "Admin User",
      email: "admin@flyingchicken.com",
      password: "admin123",
      phone: "9876543210",
      role: "admin",
      address: {
        street: "Admin Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
      },
    });
    await adminUser.save();
    console.log("👤 Created admin user");

    // Create Vendor User
    const vendorUser = new User({
      name: "Rajesh Kumar",
      email: "rajesh@spicepalace.com",
      password: "vendor123",
      phone: "9876543211",
      role: "vendor",
      address: {
        street: "Vendor Lane",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400002",
      },
    });
    await vendorUser.save();
    console.log("👤 Created vendor user");

    // Create Customer User
    const customerUser = new User({
      name: "Priya Sharma",
      email: "priya@example.com",
      password: "customer123",
      phone: "9876543212",
      role: "customer",
      address: {
        street: "Customer Avenue",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400003",
      },
    });
    await customerUser.save();
    console.log("👤 Created customer user");

    // Create Vendor Profile
    const vendor = new Vendor({
      user: vendorUser._id,
      restaurantName: "Spice Palace",
      description:
        "Authentic North Indian cuisine with a modern twist. We serve the best biryanis, curries, and tandoori dishes in Mumbai.",
      cuisine: ["North Indian", "Mughlai", "Tandoor"],
      address: {
        street: "123 Food Street, Bandra West",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400050",
        coordinates: {
          latitude: 19.0544,
          longitude: 72.8406,
        },
      },
      contact: {
        phone: "9876543211",
        email: "rajesh@spicepalace.com",
      },
      timings: {
        openTime: "10:00",
        closeTime: "23:00",
        isOpen: true,
      },
      subscription: {
        plan: "premium",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
      },
      rating: {
        average: 4.5,
        count: 150,
      },
      deliveryFee: 30,
      minimumOrder: 200,
      estimatedDeliveryTime: 35,
      isApproved: true,
      isActive: true,
      features: {
        delivery: true,
        pickup: true,
        dineIn: false,
      },
    });
    await vendor.save();
    console.log("🏪 Created vendor profile");

    // Create Menu Items
    const menuItems = [
      {
        vendor: vendor._id,
        name: "Chicken Biryani",
        description:
          "Fragrant basmati rice cooked with tender chicken pieces, aromatic spices, and saffron. Served with raita and boiled egg.",
        category: "main-course",
        price: 280,
        originalPrice: 320,
        ingredients: [
          "Basmati Rice",
          "Chicken",
          "Onions",
          "Spices",
          "Saffron",
          "Mint",
          "Coriander",
        ],
        allergens: ["Dairy"],
        isVegetarian: false,
        isSpicy: true,
        spiceLevel: 3,
        preparationTime: 25,
        isAvailable: true,
        isPopular: true,
        rating: {
          average: 4.6,
          count: 89,
        },
        tags: ["Popular", "Spicy", "Non-Veg"],
        variants: [
          { name: "Regular", price: 280, isDefault: true },
          { name: "Extra Chicken", price: 350, isDefault: false },
        ],
        addons: [
          { name: "Extra Raita", price: 25, isRequired: false },
          { name: "Boiled Egg", price: 15, isRequired: false },
        ],
      },
      {
        vendor: vendor._id,
        name: "Butter Chicken",
        description:
          "Tender chicken pieces cooked in rich tomato and cream gravy with aromatic spices. Served with naan bread.",
        category: "main-course",
        price: 320,
        originalPrice: 360,
        ingredients: [
          "Chicken",
          "Tomatoes",
          "Cream",
          "Butter",
          "Spices",
          "Ginger",
          "Garlic",
        ],
        allergens: ["Dairy"],
        isVegetarian: false,
        isSpicy: false,
        spiceLevel: 1,
        preparationTime: 20,
        isAvailable: true,
        isPopular: true,
        rating: {
          average: 4.4,
          count: 67,
        },
        tags: ["Popular", "Mild", "Non-Veg"],
        variants: [
          { name: "Regular", price: 320, isDefault: true },
          { name: "Extra Gravy", price: 380, isDefault: false },
        ],
        addons: [
          { name: "Garlic Naan", price: 45, isRequired: false },
          { name: "Plain Naan", price: 35, isRequired: false },
        ],
      },
      {
        vendor: vendor._id,
        name: "Dal Makhani",
        description:
          "Creamy black lentils cooked overnight with butter and cream. A rich and flavorful vegetarian dish.",
        category: "main-course",
        price: 180,
        originalPrice: 200,
        ingredients: [
          "Black Lentils",
          "Kidney Beans",
          "Butter",
          "Cream",
          "Spices",
          "Ginger",
          "Garlic",
        ],
        allergens: ["Dairy"],
        isVegetarian: true,
        isVegan: false,
        isSpicy: false,
        spiceLevel: 1,
        preparationTime: 15,
        isAvailable: true,
        isPopular: false,
        rating: {
          average: 4.2,
          count: 34,
        },
        tags: ["Vegetarian", "Mild", "Comfort Food"],
        variants: [{ name: "Regular", price: 180, isDefault: true }],
        addons: [
          { name: "Extra Butter", price: 20, isRequired: false },
          { name: "Plain Rice", price: 40, isRequired: false },
        ],
      },
      {
        vendor: vendor._id,
        name: "Tandoori Chicken",
        description:
          "Marinated chicken pieces cooked in clay oven (tandoor) with aromatic spices. Served with mint chutney.",
        category: "main-course",
        price: 350,
        originalPrice: 380,
        ingredients: [
          "Chicken",
          "Yogurt",
          "Spices",
          "Ginger",
          "Garlic",
          "Lemon",
        ],
        allergens: ["Dairy"],
        isVegetarian: false,
        isSpicy: true,
        spiceLevel: 2,
        preparationTime: 30,
        isAvailable: true,
        isPopular: true,
        rating: {
          average: 4.7,
          count: 92,
        },
        tags: ["Popular", "Tandoor", "Non-Veg"],
        variants: [
          { name: "Half", price: 350, isDefault: true },
          { name: "Full", price: 650, isDefault: false },
        ],
        addons: [
          { name: "Mint Chutney", price: 15, isRequired: false },
          { name: "Onion Rings", price: 25, isRequired: false },
        ],
      },
      {
        vendor: vendor._id,
        name: "Mango Lassi",
        description:
          "Refreshing yogurt-based drink with sweet mango pulp. Perfect to cool down after spicy food.",
        category: "beverage",
        price: 80,
        originalPrice: 90,
        ingredients: ["Yogurt", "Mango Pulp", "Sugar", "Cardamom"],
        allergens: ["Dairy"],
        isVegetarian: true,
        isVegan: false,
        isSpicy: false,
        spiceLevel: 0,
        preparationTime: 5,
        isAvailable: true,
        isPopular: false,
        rating: {
          average: 4.1,
          count: 23,
        },
        tags: ["Sweet", "Refreshing", "Cold"],
        variants: [
          { name: "Regular", price: 80, isDefault: true },
          { name: "Large", price: 120, isDefault: false },
        ],
      },
    ];

    for (const item of menuItems) {
      const menuItem = new MenuItem(item);
      await menuItem.save();
    }
    console.log("🍽️ Created menu items");

    console.log("✅ Database seeded successfully!");
    console.log("\n📋 Sample Data Created:");
    console.log("👤 Admin: admin@flyingchicken.com / admin123");
    console.log("🏪 Vendor: rajesh@spicepalace.com / vendor123");
    console.log("👤 Customer: priya@example.com / customer123");
    console.log("\n🎉 You can now start the application!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

// Run seeding
const runSeed = async () => {
  await connectDB();
  await seedData();
};

// Execute if run directly
if (require.main === module) {
  runSeed();
}

module.exports = { seedData, connectDB };

