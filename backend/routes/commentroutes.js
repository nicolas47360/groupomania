const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentctrl");
const authuser = require("../middelware/authuser");

router.get("/", authuser, commentCtrl.getAllComments);
router.post("/", authuser, commentCtrl.createComment);
router.put("/:id", authuser, commentCtrl.updateComment);
router.delete("/:id", authuser, commentCtrl.deleteComment);
router.delete("/all/:id", authuser, commentCtrl.deleteCommentsByPostId);
router.post("/:id/like", authuser, commentCtrl.likeComment);

module.exports = router;
