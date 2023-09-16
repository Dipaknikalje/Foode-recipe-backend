const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  userId:{
    type:String
  },
});
const user = mongoose.model("userData", userSchema);

module.exports = user;
