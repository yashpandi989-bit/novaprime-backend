const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  hsn: String,
  qty: {
    type: Number,
    default: 1,
  },
  rate: {
    type: Number,
    default: 0,
  },
  gst: {
    type: Number,
    default: 18,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },

    invoiceDate: String,
    dueDate: String,

    customerName: String,
    phone: String,
    email: String,

    billGstin: String,
    billState: String,
    billStateCode: String,
    billingAddress: String,

    shipName: String,
    shipPhone: String,
    shipGstin: String,
    shipState: String,
    shipStateCode: String,
    shippingAddress: String,

    items: [invoiceItemSchema],

    subtotal: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    freight: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Number,
      default: 0,
    },
    packing: {
      type: Number,
      default: 0,
    },

    cgst: {
      type: Number,
      default: 0,
    },
    sgst: {
      type: Number,
      default: 0,
    },
    igst: {
      type: Number,
      default: 0,
    },

    roundOff: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Partial", "Paid", "Overdue"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);