const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const user = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  saved_recipes: [],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", user);

module.exports = User;
