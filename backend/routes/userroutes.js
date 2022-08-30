const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userctrl");
const auth = require("../middelware/authuser");
const multer = require("../middelware/multerconfig");

router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getUser);
router.post("/", auth, multer, userCtrl.createUser);
router.put("/:id", auth, multer, userCtrl.updateUser);
router.delete("/:id", auth, multer, userCtrl.deleteUser);
module.exports = router;
