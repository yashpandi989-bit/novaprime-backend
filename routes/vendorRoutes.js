const express = require("express");
const Vendor = require("../models/Vendor");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Vendor fetch failed",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Vendor save failed",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Vendor deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Vendor delete failed",
      error: error.message,
    });
  }
});

module.exports = router;