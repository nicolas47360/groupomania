const Comment = require("../models/comment_model");

exports.readComment = (req, res, next) => {
  Comment.find()
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
  const commentObject = req.body;
  delete commentObject._id;
  const comment = new Comment({
    ...commentObject,
    likes: 0,
    usersLiked: [],
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "le commentaire a été enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};


exports.deleteComment = (req, res, next) => {
  console.log(req.params.id);
  Comment.findOne({ _id: req.params.id });
  Comment.deleteOne({ _id: req.params.id })
    .then(() =>
      res.status(200).json({ message: "le commentaire a été supprimé" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteCommentsByPostId = (req, res, next) => {
  Comment.find({ postId: req.params.id });
  Comment.deleteMany({ postId: req.params.id })
    .then(() =>
      res.status(200).json({ message: "le commentaire a été supprimé" })
    )
    .catch((error) => res.status(400).json({ error }));
}

exports.updateComment = (req, res, next) => {
  const commentObject = req.file ?
    {
      ...JSON.parse(req.body.comment),
    }
    : { ...req.body };
  Comment.updateOne({ _id: req.params.id }, { ...commentObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "le commentaire a été mis à jour" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.likeComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then((comment) => {
      if (req.body.like === 1 && !comment.usersLiked.includes(req.body.userId)) {
        Comment.updateOne({ _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: " comment like" }))
          .catch(error => res.status(400).json({ error }))
      }

      else if (req.body.like === 0 && comment.usersLiked.includes(req.body.userId)) {
        Comment.updateOne({ _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: " comment dislike" }))
          .catch(error => res.status(400).json({ error }))
      }
    })
    .catch(error => res.status(400).json({ error }));
};
