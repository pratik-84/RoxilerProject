const express = require("express");

const router = express.Router();

const {
  createStore,
  getStores
} = require("../controllers/storeController");

const {
  protect,
  admin
} = require("../middleware/authMiddleware");



router.post(
  "/",
  protect,
  admin,
  createStore
);


router.get(
  "/",
  protect,
  getStores
);


module.exports = router;