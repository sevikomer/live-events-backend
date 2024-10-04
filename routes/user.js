const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get("/", userCtrl.getHome);
router.get("/login", userCtrl.getConnection);
router.post("/login", userCtrl.login);
router.post("/signup", userCtrl.signup);
router.get("/logout", userCtrl.logoutUser);
router.get("/logout", userCtrl.getConnection);


module.exports = router;