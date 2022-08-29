const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postctrl");
const auth = require("../middelware/authuser");
const multer = require("../middelware/multerconfig")

router.get("/", auth, postCtrl.readPost);
router.get("/:id", auth, multer, postCtrl.getPost)
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, multer, postCtrl.deletePost);
router.put("/:id/like", auth, postCtrl.likePost);

module.exports = router;
