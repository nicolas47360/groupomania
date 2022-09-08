const Comment = require("../models/comment_model");
/*
allows you to get all comments in the DB 
*/
exports.getAllComments = (req, res, next) => {
  Comment.find()
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => res.status(400).json({ error }));
};
/*
allows you to get all comment for a postId in the DB 
*/
exports.getCommentsByPostId = (req, res, next) => {
  Comment.find({ postId: req.params.id })
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => res.status(400).json({ error }));
}
/*
allows you to create a comment in the DB 
*/
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
    .then(() => res.status(201).json({ message: "le commentaire a été ajouté" }))
    .catch((error) => res.status(400).json({ error }));
};

/*
allows you to delete a like a comment in the DB by the object id
*/
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id });
  Comment.deleteOne({ _id: req.params.id })
    .then(() =>
      res.status(200).json({ message: "le commentaire a été supprimé" })
    )
    .catch((error) => res.status(400).json({ error }));
};
/*
allows you to delete a like a comment in the DB by the postId
*/
exports.deleteCommentsByPostId = (req, res, next) => {
  Comment.find({ postId: req.params.id });
  Comment.deleteMany({ postId: req.params.id })
    .then(() =>
      res.status(200).json({ message: "le commentaire a été supprimé" })
    )
    .catch((error) => res.status(400).json({ error }));
}
/*
allows you to delete a like a comment in the DB by the userId
*/
exports.deleteCommentsByUserId = (req, res, next) => {
  Comment.find({ userId: req.params.id });
  Comment.deleteMany({ userId: req.params.id })
    .then(() =>
      res.status(200).json({ message: "le commentaire a été supprimé" })
    )
    .catch((error) => res.status(400).json({ error }));
}
/*
allows you to update a comment in the DB by the object id
*/
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
/*
allows you to put a like a comment in the DB by the object id
*/
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
