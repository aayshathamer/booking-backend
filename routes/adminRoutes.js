// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllAdmins,
  getAdminProfile,
  updateAdminProfile,
  addAdmin,
} = require("../controllers/adminController");

// GET all admins
router.get("/", getAllAdmins);

// GET my profile
router.get("/profile", getAdminProfile);

// UPDATE my profile
router.put("/profile", updateAdminProfile);

// ADD new admin
router.post("/", addAdmin);

module.exports = router;
