const {
  bookRecipe,
  deleteSavedRecipe,
  fetchSavedRecipe,
  UserDetailsData,
} = require("../dbController/RecipeFile");

const recipeRoute = require("express").Router();

recipeRoute.post("/saverecipe", bookRecipe);
recipeRoute.delete("/deleterecipe", deleteSavedRecipe);
recipeRoute.get("/fetchrecipe/:email", fetchSavedRecipe);
recipeRoute.get("/userdetails", UserDetailsData);

module.exports = recipeRoute;
