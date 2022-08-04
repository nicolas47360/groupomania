const mongoose = require("mongoose");

const modelComment = mongoose.Schema(
  {
    userId: {
      type: String,
      reruired: true,
    },

    message: {
      type: String,
      required: true,
      maxlenght: 370,
    },

    likes: {
      type: Number,
      required: true
    },

    usersLiked:
      { type: [String], required: true },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("comment", modelComment);
