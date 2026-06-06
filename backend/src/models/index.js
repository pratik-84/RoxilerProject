const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");

const Store = require("./Store");
const Rating = require("./Rating");


// CATEGORY ↔ PRODUCT

Category.hasMany(Product, {
  foreignKey: "categoryId",
  onDelete: "CASCADE"
});

Product.belongsTo(Category, {
  foreignKey: "categoryId"
});


// USER ↔ PRODUCT

User.hasMany(Product, {
  foreignKey: "userId"
});

Product.belongsTo(User, {
  foreignKey: "userId"
});


// OWNER ↔ STORES

User.hasMany(Store, {
  foreignKey: "owner_id",
  as: "stores"
});

Store.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner"
});


// USER ↔ STORE RATING

User.belongsToMany(Store, {
  through: Rating,
  foreignKey: "user_id"
});

Store.belongsToMany(User, {
  through: Rating,
  foreignKey: "store_id"
});


module.exports = {
  User,
  Category,
  Product,
  Store,
  Rating
};