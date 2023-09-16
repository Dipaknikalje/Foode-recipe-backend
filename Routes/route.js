const route = require("express").Router();
const {
  Register,
  Login,
  checkLoggedIn,
  logOut,
} = require("../dbController/controller");
// const auth=require('../middleware/auth')
route.post("/register", Register);

route.post("/login", Login);

route.get("/checkloggedin", checkLoggedIn);

route.get("/logout", logOut);

module.exports = route;
