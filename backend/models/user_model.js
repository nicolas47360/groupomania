const mongoose = require("mongoose");

const modeluser = mongoose.Schema({
  userId: {
    type: String,
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

  imageUrl: {
    type: String,
    default: "http://localhost:5000/images/profil.png"
  },
});

module.exports = mongoose.model("user", modeluser);
