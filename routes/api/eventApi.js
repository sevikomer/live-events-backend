const express = require('express');
const router = express.Router();

const multer = require('../../middleware/multer-config');

const eventApiCtrl = require('../../controllers/eventApi');
const authAPI = require('../../middleware/authAPI');

router.get('/', eventApiCtrl.getAllEvents);
router.post('/new', authAPI, multer, eventApiCtrl.createEvent);
router.get('/:id', eventApiCtrl.getOneEvent);
router.put('/:id', authAPI, multer, eventApiCtrl.modifyEvent);
router.delete('/:id', authAPI, eventApiCtrl.deleteEvent);

module.exports = router;