const router = require("express").Router();

const { response } = require("express");
const album = require("../models/album");

// get albums
router.get("/getAll", async (req, res) => {
  try {
    const result = await album.find().sort({ createdAt: 1 });
    return res.status(200).json({ success: true, response: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ad album to db
router.post("/addAlbum", async (req, res) => {
  //
  try {
    const { name, imageURL } = req.body;
    const albumToAdd = album({
      name: name,
      imageURL: imageURL,
    });
    const result = await albumToAdd.save();
    return res.status(200).json({ success: true, response: result });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// get album from db by id
router.get("/getAlbum/:id", async (req, res) => {
  try {
    const idAlbum = req.params.id;
    console.log(idAlbum);
    const requestedAlbum = await album.findOne({ _id: `${idAlbum}` });
    return res.status(200).json({ success: true, album: requestedAlbum });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

//delete a specific album by its ID
router.delete("/deleteAlbum/:id", async (req, res) => {
  try {
    const idAlbum = req.params.id;
    const result = await album.deleteOne({ _id: `${idAlbum}` });
    return res.status(200).json({ success: true, response: result });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "no such album in db" });
  }
});

// update album info in db

router.put("/updateAlbum/:id", async (req, res) => {
  //

  try {
    const { name, imageURL } = req.body;
    const idAlbum = req.params.id;
    const result = await album.findOneAndUpdate(
      { _id: `${idAlbum}` },
      {
        name: name,
        imageURL: imageURL,
      },
      { upsert: true, new: true }
    );
    return res.status(200).json({ success: true, response: result });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error: "erro , no such id in db" });
  }
});

//
module.exports = router;
