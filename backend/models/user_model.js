const mongoose = require("mongoose");

const modeluser = mongoose.Schema({
  userId: {
    type: String,
  },

  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("user", modeluser);
