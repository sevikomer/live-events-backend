const express = require('express');
const router = express.Router();

const userApiCtrl = require('../../controllers/userApi');

router.post('/login', userApiCtrl.login);

module.exports = router;