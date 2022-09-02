const Post = require("../models/post_model");
const fs = require("fs");
/*
allows you to gat all Posts in the DB
*/
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};
/*
allows you to get a post  in the DB by the id
*/
exports.getPost = (req, res, next) => {
  Post.findOne({ id: req.params.id })
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => res.status(400).json({ error }));
}
/*
allows you to update a post in the DB by the object id
*/
exports.updatePost = (req, res, next) => {
  const postObject = req.file ?
    {
      ...req.body.post,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    }
    : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Le post a été modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};

/*
allows you to delete a post in the DB by the object id
*/
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.imageUrl !== null) {
        const filename = post.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Le post ainsi que les commentaires associés ont été supprimés" })
            })
            .catch((error) => res.status(400).json({ error }));
        });
      }
      else {
        Post.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Le post ainsi que les commentaires associés ont été supprimés" })
          })
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deletePostsByUserId = (req, res, next) => {
  Post.find({ userId: req.params.id })
    .then((posts) => {
      for (let post of posts) {
        if (post.imageUrl !== null) {
          const filename = post.imageUrl.split("/images")[1];
          fs.unlink(`images/${filename}`, () => {
            Post.deleteMany({ userId: req.params.id })
              .then(() => {
                res.status(200).json({ message: "Le post ainsi que les commentaires associés ont été supprimés" })
              })
              .catch((error) => res.status(400).json({ error }));
          });
          return
        }
        else {
          Post.deleteMany({ userId: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Le post ainsi que les commentaires associés ont été supprimés" })
            })
            .catch((error) => res.status(400).json({ error }));
          return
        }
      }

    })
    .catch((error) => res.status(500).json({ error }));
};
/*
allows you to create a post in the DB
*/
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
/*
allows you to put a like a post and the user id of the liker in the DB by the object id
*/
exports.likePost = (req, res, next) => {
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

