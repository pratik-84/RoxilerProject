const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// REGISTER
exports.register = async (req, res) => {
  try {

    const { name, email, password, address, role } = req.body;

    // Check existing user
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET LOGGED IN USER

exports.getMe = async (req, res) => {

  res.json({
    success: true,
    user: req.user
  });

};