const mongoose = require("mongoose");

const modelComment = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    postId: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
      maxlenght: 370,
    },

    likes: {
      type: Number,
      required: true,
    },

    usersLiked:
      { type: [String], required: false, },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("comment", modelComment);
