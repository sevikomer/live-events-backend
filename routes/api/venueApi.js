const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const venueApiCtrl = require('../../controllers/venueApi');

router.get('/', auth, venueApiCtrl.getAllVenues);
router.post('/new', auth, venueApiCtrl.createVenue);
router.get('/:id', auth, venueApiCtrl.getOneVenue);
router.put('/:id', auth, venueApiCtrl.modifyVenue);
router.delete('/:id', auth, venueApiCtrl.deleteVenue);

module.exports = router;