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

    imageUrl: {
      type: String,
    },

    likes: {
      type: Number,
      required: true
    },

    usersLiked: { type: [String], required: true },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", modelPost);
