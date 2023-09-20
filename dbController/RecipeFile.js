const User = require("../modelSchema/userDbSchema");
const { UserDetails } = require("../dbController/Userdetails");
const recipeSaves = require("../modelSchema/recipeSchema");

const bookRecipe = async (req, res) => {
  const data = req.body;
  // console.log(data,"this is data")
  const UserAuth = await UserDetails(req.headers);
  try {
    const user = await recipeSaves.findOne({ email: data.email });
    // console.log(user, "this is user");
    // console.log(data.email, "this is data.email");

    // new User
    if (!user) {
      console.log("inside not user");
      const newUser = new recipeSaves({
        email: data.email,
        saved: [
          {
            recipe: data.recipe,
          },
        ],
      });

      const result = await newUser.save();
      return res.send(result);
    }
    // console.log(data.recipe.label);
    // console.log(user.saved.find((recipe) => recipe));
    // Checking for existance of recipeName
    const existingRecipe = user.saved.find((savedItem) => {
      return savedItem.recipe.some(
        (recipeItem) => recipeItem.label === data.recipe.label
      );
    });

    // console.log(existingRecipe);
    if (existingRecipe) {
      // console.log("Recipe already exists");
      return res.status(204).send("Recipe has already been saved");
    }

    // Push the new recipe to the saves array
    user.saved.push({
      recipe: data.recipe,
    });

    // Save the updated user document
    const result = await user.save();

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(409).send("Unable to save recipe");
  }
};

const fetchSavedRecipe = async (req, res) => {
  const email = req.params.email;
  // console.log(email);
  const userRecipe = await recipeSaves.findOne({ email: email });
  res.send({
    userRecipe: userRecipe,
  });
};

const deleteSavedRecipe = async (req, res) => {
  const userAuth = await UserDetails(req.headers);
  const data = await req.body;
  // console.log(data.label, "data in req.body");
  const recipeIndex = userAuth.saved_recipes.findIndex(
    (recipe) => recipe.label === data.label
  );
  // console.log(recipeIndex);

  userAuth.saved_recipes.splice(recipeIndex, 1);
  const result = await userAuth.save();
  return res.send({ result: result });
};

const UserDetailsData = async (req, res) => {
  const userAuth = await UserDetails(req.headers);
  return res.send({ User: userAuth });
};

module.exports = {
  bookRecipe,
  deleteSavedRecipe,
  fetchSavedRecipe,
  UserDetailsData,
};
