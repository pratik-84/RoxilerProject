const { Store, User } = require("../models");

const sequelize = require("../config/db");

const { Op } = require("sequelize");


exports.createStore = async (req, res) => {

  try {

    const {
      name,
      email,
      address,
      owner_id
    } = req.body;

    const owner = await User.findByPk(owner_id);

    if (!owner || owner.role !== "owner") {

      return res.status(400).json({
        success: false,
        message: "Invalid owner"
      });

    }

    const store = await Store.create({
      name,
      email,
      address,
      owner_id
    });

    res.status(201).json({
      success: true,
      store
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


exports.getStores = async (req, res) => {

  try {

    const {
      search,
      sort = "name",
      order = "ASC"
    } = req.query;

    let condition = {};

    if (search) {

      condition = {

        [Op.or]: [

          {
            name: {
              [Op.like]: `%${search}%`
            }
          },

          {
            address: {
              [Op.like]: `%${search}%`
            }
          }

        ]

      };

    }

    const stores = await Store.findAll({

      where: condition,

      order: [[sort, order]],

      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "name"]
        }
      ]

    });

    res.json({
      success: true,
      stores
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};