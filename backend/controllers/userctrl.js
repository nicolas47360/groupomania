const User = require("../models/user_model");
const fs = require("fs");


exports.getAllUser = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.getUser = (req, res, next) => {
  User.findOne({ userId: req.params.id })
    .then((user) => {
      res.status(200).json(user)
      console.log(user);
    })
    .catch((error) => res.status(400).json({ error }));
}

exports.createUser = (req, res, next) => {
  const userObject = req.body;
  delete userObject._id;
  let user = '';
  if (req.file) {
    user = new User({
      ...userObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
  } else {
    user = new User({
      ...userObject,
    });
  }
  user.save()
    .then(() => {
      res.status(201).json({ message: "l'utilisateur a été enregistré" });
      console.log(user);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.updateUser = (req, res, next) => {
  const userObject = req.file ?
    {
      ...JSON.parse(req.body.user),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
        }`,
    }
    : { ...req.body };
  User.updateOne({ userId: req.params.id }, { ...userObject, userId: req.params.id })
    .then(() => res.status(200).json({ message: "les données de l'utilisateur ont été modifiées" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.findOne({ userId: req.params.id })
    .then((user) => {
      const filename = user.imageUrl.split("/images")[1];
      fs.unlink(`images/${filename}`, () => {
        User.deleteOne({ id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "le user a été supprimée" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
