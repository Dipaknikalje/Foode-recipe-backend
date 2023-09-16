const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./db/mongooseDb");
const userdbroute = require("./Routes/userdbroute");
const route = require("./Routes/route");
const recipeRoute = require("./Routes/recipeRoute");
dotenv.config();
const app = express();
app.use(express.json());

const corsOption = {
  origin: "*",
};
app.use(cors(corsOption));

app.use("/userdata", userdbroute);
app.use("/user",route)
app.use('/recipe',recipeRoute)

app.get("/", (req, res) => {
  res.send("home page is rendered");
});

port = process.env.PORT;
app.listen(port, async () => {
  try {
    console.log(`server running on port ${port}`);
    await connect();
  } catch (error) {
    console.log("something went wrong", error.message);
  }
});
