const express = require("express");

const router = express.Router();

const {
  adminDashboard
} = require("../controllers/adminController");

const {
  protect,
  admin
} = require("../middleware/authMiddleware");


router.get(
  "/dashboard",
  protect,
  admin,
  adminDashboard
);

module.exports = router;