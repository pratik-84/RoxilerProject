const { Product, Category } = require("../models");


// CREATE PRODUCT

exports.createProduct = async (req, res) => {

  try {

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// GET ALL PRODUCTS

exports.getProducts = async (req, res) => {

  try {

    const products = await Product.findAll({
      include: Category
    });

    res.json({
      success: true,
      data: products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};