const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../modelSchema/userDbSchema");
dotenv.config();
const SECRET_KEY = process.env.secretKey;

const UserDetails = async (header) => {
  const { authorization } = header;

  const token = authorization.split(" ")[1];

  if (token) {
    try {
      const { email } = jwt.verify(token, SECRET_KEY);

      const User1 = await User.findOne({ email: email });
      return User1;
    } catch (err) {
      console.log(err, "Error in Get user catch BLOCK");
    }
  }

  return "null not found";
};

module.exports = { UserDetails };
