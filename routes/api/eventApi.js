const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const multer = require('../../middleware/multer-config');

const eventApiCtrl = require('../../controllers/eventApi');

router.get('/', auth, eventApiCtrl.getAllEvents);
router.post('/new', auth, multer, eventApiCtrl.createEvent);
router.get('/:id', auth, eventApiCtrl.getOneEvent);
router.put('/:id', auth, multer, eventApiCtrl.modifyEvent);
router.delete('/:id', auth, eventApiCtrl.deleteEvent);

module.exports = router;