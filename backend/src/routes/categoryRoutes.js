const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories
} = require("../controllers/categoryController");

const {
  protect,
  admin
} = require("../middleware/authMiddleware");


// CREATE CATEGORY (ADMIN ONLY)

router.post(
  "/",
  protect,
  admin,
  createCategory
);


// GET ALL CATEGORIES

router.get("/", getCategories);

module.exports = router;