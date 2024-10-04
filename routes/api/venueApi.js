const express = require('express');
const router = express.Router();

const venueApiCtrl = require('../../controllers/venueApi');
const authAPI = require('../../middleware/authAPI');

router.get('/', venueApiCtrl.getAllVenues);
router.post('/new', authAPI, venueApiCtrl.createVenue);
router.get('/:id', venueApiCtrl.getOneVenue);
router.put('/:id', authAPI, venueApiCtrl.modifyVenue);
router.delete('/:id', authAPI, venueApiCtrl.deleteVenue);

module.exports = router;