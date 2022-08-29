const Post = require("../models/post_model");
const fs = require("fs");

exports.readPost = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getPost = (req, res, next) => {
  Post.findOne({ id: req.params.id })
    .then((user) => {
      res.status(200).json(user)
      console.log(user);
    })
    .catch((error) => res.status(400).json({ error }));
}

exports.updatePost = (req, res, next) => {
  const postObject = req.file ?
    {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    }
    : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Le post a été modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      console.log(post);
      if (post.imageUrl !== null) {
        const filename = post.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then((del) => {
              console.log(del)
              res.status(200).json({ message: "Le post ainsi que les commentaires associés ont été supprimés" })
            })
            .catch((error) => res.status(400).json({ error }));
        });
      }
      else {
        Post.deleteOne({ _id: req.params.id })
          .then((del) => {
            console.log(del)
            res.status(200).json({ message: "Le post ainsi que les commentaires associés ont été supprimés" })
          })
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.createPost = (req, res, next) => {
  const postObject = req.body;
  delete postObject._id;
  let post = '';
  if (req.file) {
    post = new Post({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      likes: 0,
      usersLiked: [],
    });
  } else {
    post = new Post({
      ...postObject,
    });
  }
  post.save()
    .then(() => res.status(201).json({ message: "Le post a été ajouté au fil d'actualité" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.likePost = (req, res, next) => {
  console.log(req.params.id)
  console.log(req.body.likes);
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (req.body.likes === 1 && !post.usersLiked.includes(req.body.userId)) {
        Post.updateOne({ _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId }
          }

        )
          .then(() => res.status(201).json({ message: " post est like" }))
          .catch(error => res.status(400).json({ error }))
      }

      else if (req.body.likes !== 0 && post.usersLiked.includes(req.body.userId)) {
        Post.updateOne({ _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: " post est dislike" }))
          .catch(error => res.status(400).json({ error }))
      }
    })
    .catch(error => res.status(400).json({ error }));
};

