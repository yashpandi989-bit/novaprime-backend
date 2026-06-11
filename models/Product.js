const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: String,
    hsn: String,
    gst: { type: Number, default: 18 },
    rate: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    unit: { type: String, default: "pcs" },
    description: String,
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);