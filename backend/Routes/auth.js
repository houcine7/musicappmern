const router = require("express").Router();

const admin = require("../config/firebase.config");

router.get("/login", async (req, res) => {
  //
  if (!req.headers.authorization) {
    return res.status(500).json({ msg: "no token provided in headers" });
  } else {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const userInfo = await admin.auth().verifyIdToken(token);

      if (!userInfo) {
        return res.status(505).json({ msg: "not authorized" });
      } else {
        return res.status(200).json({ msg: userInfo });
      }
    } catch (error) {
      res.status(505).json({ msg: error });
    }
  }
});

module.exports = router;
