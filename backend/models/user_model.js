const mongoose = require("mongoose");

const modeluser = mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 30,
    unique: true,
  },

  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    default: " ",
  },
});

module.exports = mongoose.model("user", modeluser);
