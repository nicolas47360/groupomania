const mongoose = require("mongoose");

const modelPost = mongoose.Schema(
  {
    userId: {
      type: String,
      reruired: true,
    },
    title: {
      type: String,
    },

    message: {
      type: String,
      required: true,
      maxlenght: 370,
    },

    imageUrl: {
      type: String,
      default: null,
    },

    likes: {
      type: Number,
    },

    usersLiked: { type: [String], required: true },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", modelPost);
