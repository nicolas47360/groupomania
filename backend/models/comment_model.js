const mongoose = require("mongoose");

const modelComment = mongoose.Schema(
  {
    commentId: {
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
      required: true
    },
    
    usersLiked: { type: [String], required: true },
  },
  {
    timesstamp: true,
  }
);

module.exports = mongoose.model("comment", modelComment);
