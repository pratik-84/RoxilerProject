const { Rating, Store } = require("../models");

exports.submitRating = async (req, res) => {

  try {

    const {
      store_id,
      rating
    } = req.body;

    const store = await Store.findByPk(store_id);

    if (!store) {

      return res.status(404).json({
        success: false,
        message: "Store not found"
      });

    }

    const existingRating = await Rating.findOne({
      where: {
        user_id: req.user.id,
        store_id
      }
    });

    if (existingRating) {

      existingRating.rating = rating;

      await existingRating.save();

      return res.json({
        success: true,
        message: "Rating updated",
        existingRating
      });

    }

    const newRating = await Rating.create({
      user_id: req.user.id,
      store_id,
      rating
    });

    res.status(201).json({
      success: true,
      newRating
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};