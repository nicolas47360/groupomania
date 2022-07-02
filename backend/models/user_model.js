const mongoose = require("mongoose");

const modeluser = mongoose.Schema({
  userId: {
    type: String,
    reruired: true,
  },

  pseudo: {
    type: String,
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
  },

  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("user", modeluser);
