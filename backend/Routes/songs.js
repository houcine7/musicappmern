const router = require("express").Router();

const song = require("../models/song");

// get all songs

router.get("/getAll", async (req, res) => {
  try {
    const result = await song.find().sort({ createdAt: 1 });
    return res.status(200).json({ success: true, data: result });
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
    console.log(error);
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

router.delete("/deleteSong/:id", async (req, res) => {
  //
  try {
    const idSong = req.params.id;
    const result = await song.deleteOne({ _id: `${idSong}` });
    return res.status(200).json({ success: false, msg: result });
  } catch (error) {
    return res.status(400).json({ success: false, error: "song not found " });
  }
});

// edit an existing song by id
router.put("/updateSong/:id", async (req, res) => {
  //
  try {
    const idSong = req.params.id;
    const { name, songURL, imageURL, artist, language, category, album } =
      req.body;
    const result = await song.findOneAndUpdate(
      { _id: `${idSong}` },
      {
        name: name,
        songURL: songURL,
        imageURL: imageURL,
        artist: artist,
        language: language,
        category: category,
        album: album,
      },
      {
        upsert: true,
        new: true,
      }
    );
    return res.status(200).json({ success: true, response: result });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "can't found a song with id " + id });
  }
});

module.exports = router;
