const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");
app.get("/api/seed-products", async (req, res) => {
  try {
    const products = require("./seedProductsData");

    await Product.deleteMany({});
    await Product.insertMany(products);

    res.json({
      success: true,
      message: "Products seeded successfully",
      count: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});