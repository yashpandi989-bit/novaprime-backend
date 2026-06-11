const express = require("express");
const Customer = require("../models/Customer");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Customer create failed",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Customers fetch failed",
      error: error.message,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Customer fetch failed",
      error: error.message,
    });
  }
});

router.put("/:id/notes", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { notes: req.body.notes },
      { new: true }
    );

    res.json({
      success: true,
      message: "Notes saved successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Notes save failed",
      error: error.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Customer delete failed",
      error: error.message,
    });
  }
});

module.exports = router;
router.put("/:id/notes", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        notes: req.body.notes,
      },
      { new: true }
    );

    res.json({
      success: true,
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});