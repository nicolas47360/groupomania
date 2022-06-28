const mongoose = require("mongoose");

const modeluser = mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 30,
    unique: true,
    trim: true,
  },

  firstname: {
    type: String,
    required: true,
    trim: true,
  },

  lastname: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  imageUrl: {
    type: String,

  },
});

module.exports = mongoose.model("user", modeluser);
