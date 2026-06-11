const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    company: String,
    phone: String,
    email: String,
    gst: String,
    state: String,
    stateCode: String,
    address: String,

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Pending", "Inactive"],
      default: "Active",
    },

    totalSales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);