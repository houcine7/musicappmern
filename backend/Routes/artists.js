const router = require("express").Router();
const ObjectId = require("mongoose").Types.ObjectId;
// import our artist model
const artist = require("../models/artist");

router.get("/getAll", async (req, res) => {
  try {
    const allAtists = await artist.find().sort({ createdAt: 1 });

    return res.status(200).json({ success: true, data: allAtists });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: "not found" });
  }
});

router.post("/addArtist", async (req, res) => {
  const { name, imageURL, instagram } = req.body;

  const artistToAdd = artist({
    name: name,
    imageURL: imageURL,
    instagram: instagram,
  });

  // save the artist to db
  try {
    const result = await artistToAdd.save();
    res.status(200).json({ success: true, msg: result });
  } catch (error) {
    // bad request made by client
    res.status(400).json({ success: false, error: "not found" });
  }
});

// get a artist by ID
router.get("/getArtist/:id", async (req, res) => {
  try {
    const idArtist = req.params.id;
    const result = await artist.findOne({ _id: `${idArtist}` });
    return res.status(200).json({ success: true, artist: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: "not found" });
  }
});

// delete artist by ID

router.delete("/deleteArtist/:id", async (req, res) => {
  try {
    const idArtist = req.params.id;
    const result = await artist.deleteOne({ _id: `${idArtist}` });
    return res.status(200).json({ success: true, response: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: "not found" });
  }
});

// update artist info in db

router.put("/updateArtist/:id", async (req, res) => {
  try {
    const idArtist = req.params.id;
    const { name, imageURL, instagram } = req.body;
    const result = await artist.findOneAndUpdate(
      { _id: idArtist },
      {
        name: name,
        imageURL: imageURL,
        instagram: instagram,
      },
      {
        upsert: true,
        new: true,
      }
    );
    return res.status(200).json({ success: true, response: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
