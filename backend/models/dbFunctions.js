// users
//insert
const insertUserToDb = async (userToAdd, res, user) => {
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

//update
const updateUserAuthTime = async (userToAdd, res, user) => {
  //
  try {
    const result = await user.findOneAndUpdate(
      { user_id: userToAdd.user_id },
      { auth_time: userToAdd.auth_time },
      {
        upsert: true,
        new: true,
      }
    );
    return res.status(200).json({ msg: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = { insertUserToDb, updateUserAuthTime };
