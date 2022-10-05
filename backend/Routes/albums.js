const router = require("express").Router();

const album = require("../models/album");

router.get("/getAll", (req, res) => {
  return res.status(200).json({ msg: "albums route just works fine !!!" });
});

module.exports = router;
