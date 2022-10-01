const router = require("express").Router();

const admin = require("../config/firebase.config");

//
const user = require("../models/user");
const { insertUserToDb, updateUserAuthTime } = require("../models/dbFunctions");
router.get("/login", async (req, res) => {
  //
  if (!req.headers.authorization) {
    return res.status(500).json({ msg: "no token provided in headers" });
  } else {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const userToAddToDb = await admin.auth().verifyIdToken(token);

      if (!userToAddToDb) {
        return res.status(505).json({ msg: "not authorized" });
      } else {
        const userInDb = await user.findOne({
          user_id: userToAddToDb.user_id,
        });

        // if user is already in the db update it's auth time
        if (!userInDb) {
          await insertUserToDb(userToAddToDb, res, user);
        } else {
          await updateUserAuthTime(userToAddToDb, res, user);
        }
        //
      }
    } catch (error) {
      res.status(505).json({ msg: error });
    }
  }
});

// function to save user in db

module.exports = router;
