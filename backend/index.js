const express = require("express");
const cors = require("cors");
const { connectToDbAtlas } = require("./db/config");
const userRoute = require("./Routes/auth");
const artistsRoute = require("./Routes/artists");
const songsRoute = require("./Routes/songs");
const albumsRoute = require("./Routes/albums");

//my app
const app = express();

//config
require("dotenv").config();
app.use(cors({ origin: true }));
app.use(express.json());

// users routing
app.use("/api/users", userRoute);

// songs routing
app.use("/api/songs", songsRoute);

// artist routing
app.use("/api/artists", artistsRoute);

// album routing
app.use("/api/albums", albumsRoute);

//connect to db
connectToDbAtlas();

app.listen(8000, () => {
  console.log("listening on port 8000");
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "the server is running" });
});
