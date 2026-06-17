require("dns").setServers(["8.8.8.8", "8.8.4.4"]);

console.log("SERVER VERSION 17-JUNE");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const customerRoutes = require("./routes/customerRoutes");
const invoiceRoutes = require("./routes/InvoiceRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/auth");
const Product = require("./models/Product");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://novaprime-crm.vercel.app",
      /\.vercel\.app$/,
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Novaprime Backend Running 🚀",
  });
});

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

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
}

module.exports = app;