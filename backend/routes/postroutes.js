const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postctrl");
const auth = require("../middelware/authuser");

router.get("/", auth, postCtrl.readPost);
router.post("/", auth, postCtrl.createPost);
router.put("/:id", auth, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
