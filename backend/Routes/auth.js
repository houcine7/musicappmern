const router = require("express").Router();

const admin = require("../config/firebase.config");

//
const user = require("../models/user");
const { insertUserToDb, updateUserAuthTime } = require("../models/dbFunctions");

//get All users
router.get("/getAllUsers", async (req, res) => {
  try {
    const result = await user.find().sort({ createdAt: 1 });
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

//login route
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

//delete user from db
router.delete("/deleteUser/:id", async (req, res) => {
  //
  try {
    const idUser = req.params.id;
    const result = await user.deleteOne({ _id: idUser });
    res.status(200).json({ success: true, msg: result });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, error: error.message });
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
