const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentctrl");
const authuser = require("../middelware/authuser");

router.get("/", authuser, commentCtrl.getAllComments);
router.get("/:id", authuser, commentCtrl.getCommentsByPostId)
router.post("/", authuser, commentCtrl.createComment);
router.put("/:id", authuser, commentCtrl.updateComment);
router.delete("/:id", authuser, commentCtrl.deleteComment);
router.delete("/postId/:id", authuser, commentCtrl.deleteCommentsByPostId);
router.delete("/userId/:id", authuser, commentCtrl.deleteCommentsByUserId);
router.post("/:id/like", authuser, commentCtrl.likeComment);

module.exports = router;
