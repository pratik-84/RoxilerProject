const jwt = require("jsonwebtoken");

const { User } = require("../models");


exports.protect = async (req, res, next) => {

  try {

    let token;

    // CHECK TOKEN

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

    }

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Not authorized"
      });

    }

    // VERIFY TOKEN

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // GET USER

    req.user = await User.findByPk(decoded.id);

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Token failed"
    });

  }

};


// ADMIN MIDDLEWARE

exports.admin = (req, res, next) => {

  // CHECK USER ROLE

  if (req.user && req.user.role === "admin") {

    next();

  } else {

    return res.status(403).json({
      success: false,
      message: "Admin only"
    });

  }

};


// const jwt = require("jsonwebtoken");

// exports.verifyToken = async (req, res, next) => {

//   try {

//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "No token provided"
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.user = decoded;

//     next();

//   } catch (error) {

//     return res.status(401).json({
//       message: "Invalid token"
//     });

//   }
// };