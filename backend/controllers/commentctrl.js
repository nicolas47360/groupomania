const Comment = require("../models/comment_model");

exports.readComment = (res, req, next) => {
  Comment.find()
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => res.status(400).json({ error }));
};

exports.createComment = (res, req, next) => {
  const commentObject = JSON.parse(req.body.comment);
  delete commentObject._id;
  const comment = new Comment({
    ...commentObject,
    likes: 0,
    usersLiked: [],
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "le commentaire a été cré" }))
    .catch((error) => res.status(401).json({ error }));
};

exports.deleteComment = (res, req, next) => {
  Comment.findOne({ _id: req.params.id });
  Comment.deleteOne({ _id: req.params.id }).then(() =>
    res.status(200).json({ message: "le commentaire a été supprimé" })
  );
};

exports.updateComment = (res, req, next) => {
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
