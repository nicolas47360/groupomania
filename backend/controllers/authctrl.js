const bcrypt = require("bcrypt");
const auth = require("../models/auth_model");
const jwt = require("jsonwebtoken");

/*
allows the creation of a user with an email and a password
the password is hashed for data protection
*/
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new auth({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({
          userId: user._id,
          token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
            expiresIn: "24H",
          }),
          message: "utilisateur créé"
        }))
        .catch((error) => res.status(400).json({ error: "l'adresse email est déjà utilisée" }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/*
allows you to log in to your account
*/
exports.login = (req, res, next) => {
  auth
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "utilisateur non trouvé veuillez vous créer un compte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
              expiresIn: "24H",
            }),
            isAdmin: user.isAdmin,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
/*
allows you to delete  your account
*/
exports.deleteAccount = (req, res, next) => {
  auth
    .findOne({ email: req.params.id })
    .deleteOne({ email: req.params.id })
    .then(() => res.status(201).json({ message: " Votre compte, votre profil ainsi que l'ensemble de vos posts vont être supprimé " }))
    .catch((error) => res.status(401).json({ error }));
}

