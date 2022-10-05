const router = require("express").Router();

router.get("/getAll", (req, res) => {
  return res.status(200).json({ msg: "songs route just works fine !!!" });
});

module.exports = router;
