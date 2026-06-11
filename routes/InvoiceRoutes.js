const express = require("express");
const Invoice = require("../models/Invoice");

const router = express.Router();

// Create Invoice
router.post("/", async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);

    res.status(201).json({
      success: true,
      message: "Invoice saved successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invoice save failed",
      error: error.message,
    });
  }
});

// Get All Invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invoices fetch failed",
      error: error.message,
    });
  }
});

// Get Next Invoice Number
router.get("/next-number", async (req, res) => {
  try {
    const count = await Invoice.countDocuments();
    const nextNo = String(count + 1).padStart(3, "0");

    res.status(200).json({
      success: true,
      invoiceNo: `INV-2026-${nextNo}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invoice number generate failed",
      error: error.message,
    });
  }
});

// Get Single Invoice
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invoice fetch failed",
      error: error.message,
    });
  }
});

// Update Invoice
router.put("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invoice update failed",
      error: error.message,
    });
  }
});

// Update Invoice Status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice status updated successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invoice status update failed",
      error: error.message,
    });
  }
});

// Delete Invoice
router.delete("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invoice delete failed",
      error: error.message,
    });
  }
});

module.exports = router;