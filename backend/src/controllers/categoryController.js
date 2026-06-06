const { Category } = require("../models");


// CREATE CATEGORY

exports.createCategory = async (req, res) => {

  try {

    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: category
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// GET ALL CATEGORIES

exports.getCategories = async (req, res) => {

  try {

    const categories = await Category.findAll();

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
