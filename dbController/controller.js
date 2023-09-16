const User = require("../modelSchema/userDbSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.secretKey;

const Register = async (req, res) => {
  const { email, password } = req.body;
  const User1 = await User.findOne({ email });
  if (User1 && User1.email === email) {
    console.log("in exist");
    return res.send({
      msg: "User already register, please try a different user or login",
      token: null,
    });
  }

  const hashPass = bcrypt.hashSync(password, 10);

  const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: "3D" });

  const tempObj = new User({
    email: email,

    password: hashPass,
  });

  await tempObj.save();

  return res.send({
    msg: "User succesfully registered",
    token: token,
    email: email,
  });
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  const isExist = await User.findOne({ email: email });

  if (!isExist) {
    return res.send({
      msg: "User is not registered",
      isLoggedIn: false,
      token: null,
    });
  }

  try {
    const isVerified = bcrypt.compareSync(password, isExist.password);

    if (isVerified) {
      console.log(isVerified);
      const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: "3D" });

      return res.send({
        msg: "User logged in successfully",
        isLoggedIn: true,
        token: token,
        email: email,
      });
    } else {
      return res.send({
        msg: "please enter correct password",
        isLoggedIn: false,
        token: null,
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({
      msg: "Something went Wrong",
      isLoggedIn: false,
      token: null,
    });
  }
};

const checkLoggedIn = async (req, res) => {
  const currentTime = Math.floor(Date.now() / 1000);

  const data = req.headers;
  const token = data.authorization.split(" ")[1];
  if (token) {
    try {
      const { exp, email } = jwt.verify(token, SECRET_KEY);

      if (email && exp > currentTime) {
        return res.send({ msg: "User is already logged in", isLoggedIn: true });
      } else {
        return res.send({ msg: "Session expired", isLoggedIn: false });
      }
    } catch (err) {
      console.log(err);
      return res.send({ msg: "something went wrong", isLoggedIn: false });
    }
  }
  return res.send({ msg: "Please Login", isLoggedIn: false });
};

const logOut = (req, res) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];
    console.log(token);

    return res.send({
      msg: "Logged Out Succesfully",
      token: null,
      isLoggedIn: false,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      msg: "Something went Wrong",
    });
  }
};

module.exports = {
  Register,
  Login,
  checkLoggedIn,
  logOut,
};
