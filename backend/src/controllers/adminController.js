const { User, Store, Rating } = require("../models");

exports.adminDashboard = async (req, res) => {

  try {

    // total users
    const totalUsers = await User.count();

    // total stores
    const totalStores = await Store.count();

    // total ratings
    const totalRatings = await Rating.count();

    res.json({
      success: true,

      dashboard: {
        totalUsers,
        totalStores,
        totalRatings
      }

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};