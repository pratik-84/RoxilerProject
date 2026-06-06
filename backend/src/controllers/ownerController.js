const { Store, Rating, User } = require("../models");
const sequelize = require("../config/db");

exports.ownerDashboard = async (req, res) => {

  try {

    // logged in owner id
    const ownerId = req.user.id;

    // find owner's store
    const store = await Store.findOne({
      where: {
        owner_id: ownerId
      }
    });

    if (!store) {

      return res.status(404).json({
        success: false,
        message: "Store not found"
      });

    }

    // average rating
    const avgRating = await Rating.findOne({

      attributes: [
        [
          sequelize.fn(
            "AVG",
            sequelize.col("rating")
          ),
          "averageRating"
        ]
      ],

      where: {
        store_id: store.id
      }

    });

    // users who rated
    const ratings = await Rating.findAll({

      where: {
        store_id: store.id
      },

      include: [
        {
          model: User,
          attributes: ["id", "name", "email"]
        }
      ]

    });

    res.json({
      success: true,
      store,
      averageRating: avgRating,
      ratings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};