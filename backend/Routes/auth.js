const router = require("express").Router();

const admin = require("../config/firebase.config");

//
const user = require("../models/user");

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
          await insertUserToDb(userToAddToDb, res);
        } else {
          return res.status(200).json({ msg: "user is already in db" });
        }
        //
      }
    } catch (error) {
      res.status(505).json({ msg: error });
    }
  }
});

// function to save user in db

const insertUserToDb = async (userToAdd, res) => {
  console.log("insertiiing");
  try {
    const newUser = new user({
      user_id: userToAdd.user_id,
      name: userToAdd.name,
      email: userToAdd.email,
      email_verified: userToAdd.email_verified,
      imageURL: userToAdd.picture,
      role: "member",
      auth_time: userToAdd.auth_time,
    });
    const userSaved = await newUser.save();
    return res.status(200).json({ msg: "user saved" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = router;
