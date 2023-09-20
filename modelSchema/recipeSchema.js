const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  saved: [
    {
      recipe: {
        type: Array,
      },
    },
  ],
});
const recipeSaves = mongoose.model("saves", recipeSchema);
module.exports = recipeSaves;
