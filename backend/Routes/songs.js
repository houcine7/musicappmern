const router = require("express").Router();

const song = require("../models/song");

// get all songs

router.get("/getAll", async (req, res) => {
  try {
    const result = await song.find().sort({ createdAt: 1 });
    return res.status(200).json({ success: true, response: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// add new song to db

router.post("/addSong", async (req, res) => {
  //
  try {
    const { name, songURL, language, category, imageURL, artist, album } =
      req.body;
    const songToAdd = song({
      name: name,
      songURL: songURL,
      language: language,
      category: category,
      imageURL: imageURL,
      artist: artist,
      album: album,
    });
    const result = await songToAdd.save();
    return res.status(200).json({ success: true, msg: result });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// get a specific song

router.get("/getSong/:id", async (req, res) => {
  try {
    const idSong = req.params.id;
    const result = await song.findOne({ _id: idSong });
    return res.status(200).json({ success: true, song: result });
  } catch (error) {
    return res.status(400).json({ success: false, error: "song not found " });
  }
});

// remove a song by its id

router.delete("/deletSong/:id", async (req, res) => {
  //
  try {
    const idSong = req.params;
    const result = await song.deleteOne({ _id: idSong });
    return res.status(200).json({ success: false, response: result });
  } catch (error) {
    return res.status(400).json({ success: false, error: "song not found " });
  }
});

module.exports = router;
