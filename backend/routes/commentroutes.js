const express = require("express");
const router = express.Router();
const commentctrl = require("../controllers/commentctrl");
const authuser = require("../middelware/authuser");

router.get("/", authuser, commentctrl.readComment);
router.post("/", authuser, commentctrl.createComment);
router.put("/:id", authuser, commentctrl.updateComment);
router.delete("/:id", authuser, commentctrl.deleteComment);
router.post("/:id/like", authuser, commentctrl.likeComment);

module.exports = router;
