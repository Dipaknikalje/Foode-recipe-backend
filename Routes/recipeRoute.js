const {
  bookRecipe,
  deleteSavedRecipe,
  fetchSavedRecipe,
  UserDetailsData,
} = require("../dbController/RecipeFile");

const recipeRoute = require("express").Router();

recipeRoute.put("/saverecipe", bookRecipe);
recipeRoute.put("/deleterecipe", deleteSavedRecipe);
recipeRoute.get("/fetchrecipe", fetchSavedRecipe);
recipeRoute.get("/userdetails", UserDetailsData);

module.exports = recipeRoute;
