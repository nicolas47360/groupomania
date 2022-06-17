const mongoose = require("mongoose");

const modelPost = mongoose.Schema(
  {
    postID: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
      maxlenght: 370,
    },

    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", modelPost);
