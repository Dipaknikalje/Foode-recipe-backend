const { registerUser, loginUser } = require("../dbController/userController");

const userdbroute=require("express").Router();



userdbroute.post("/register",registerUser)
userdbroute.post('/login',loginUser)

module.exports=userdbroute