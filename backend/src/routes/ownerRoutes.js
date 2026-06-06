const express = require("express");

const router = express.Router();

const {
  ownerDashboard
} = require("../controllers/ownerController");

const {
  protect
} = require("../middleware/authMiddleware");


// owner only middleware
const ownerOnly = (req, res, next) => {

  if (req.user.role !== "owner") {

    return res.status(403).json({
      success: false,
      message: "Owner access only"
    });

  }

  next();
};


router.get(
  "/dashboard",
  protect,
  ownerOnly,
  ownerDashboard
);

module.exports = router;