const User = require("../models/user_model");
const fs = require("fs");

exports.getAllUser = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.getUser = (req, res, next) => {
  console.log(req.params.id)
  User.findOne({ id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
};

exports.createUser = (req, res, next) => {
  console.log(req.body);
  const userObject = req.body;
  const user = new User({
    ...userObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
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
  User.updateOne({ id: req.params.id }, { ...userObject, id: req.params.id })
    .then(() => res.status(200).json({ message: "les données de l'utilisateur ont été modifiées" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.findOne({ id: req.params.id })
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
