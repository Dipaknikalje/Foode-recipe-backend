const User = require("../modelSchema/userDbSchema");
const { UserDetails } = require("../dbController/Userdetails");

const bookRecipe = async (req, res) => {
  const data = await req.body;
  const UserAuth = await UserDetails(req.headers);
  const saveR = await User.findOne({
    "saved_recipes.label": data.label,
  });
  let recipeAlreadyBook = false;

  if (saveR && saveR.saved_recipes.length > 0) {
    saveR.saved_recipes.forEach((recipe) => {
      if (recipe.hasOwnProperty("label")) {
        recipeAlreadyBook = true;
      }
    });
  }
  if (UserAuth) {
    if (recipeAlreadyBook) {
      return res.send({ msg: "recipe already saved", isSaved: false });
    }

    const updateR = await UserAuth.updateOne({
      $push: { saved_recipes: data },
    });

    return res.send({ res: updateR, isSaved: true });
  }
  return res.send({ msg: "not saved", isSaved: false });
};

const fetchSavedRecipe = async (req, res) => {
  const userAuth = await UserDetails(req.headers);
  return res.send({ saved: userAuth });
};

const deleteSavedRecipe = async (req, res) => {
  const userAuth = await UserDetails(req.headers);
  const data = await req.body;
  console.log(data.label, "data in req.body");
  const recipeIndex = userAuth.saved_recipes.findIndex(
    (recipe) => recipe.label === data.label
  );
  console.log(recipeIndex);

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
