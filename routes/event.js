const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const eventCtrl = require('../controllers/event');

router.get('/', auth, eventCtrl.getAllEvents);
router.post('/', auth, multer, eventCtrl.createEvent);
router.get('/:id', auth, eventCtrl.getOneEvent);
router.put('/:id', auth, multer, eventCtrl.modifyEvent);
router.delete('/:id', auth, eventCtrl.deleteEvent);

module.exports = router;