const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const dbURI = process.env.MONGODB_URI || dbConfig.url;

const db = {
  mongoose: mongoose,
  url: dbURI,
  products: require("./product.model.js")(mongoose),
  categories: require("./category.model.js")(mongoose),
  users: require("./user.model.js")(mongoose)
};

module.exports = db;
