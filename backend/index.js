const express = require("express");
const cors = require("cors");
const userRoute = require("./Routes/auth");
const { connectToDbAtlas } = require("./db/config");

//my app
const app = express();

//config
require("dotenv").config();
app.use(cors({ origin: true }));
app.use("/api/users", userRoute);

//connect to db
connectToDbAtlas();

app.listen(8000, () => {
  console.log("listening on port 8000");
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "the server is running" });
});
