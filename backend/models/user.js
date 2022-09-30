const mongoose = require("mongoose");

const UserMongoSchema = mongoose.Schema(
  {
    //
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    auth_time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserMongoSchema);
