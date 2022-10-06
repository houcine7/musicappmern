const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    songURL: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    imageURL: {
      type: String,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("song", songSchema);
