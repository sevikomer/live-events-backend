const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const venueCtrl = require('../controllers/venue');

router.get('/', auth, venueCtrl.getAllVenues);
router.post('/', auth, venueCtrl.createVenue);
router.get('/:id', auth, venueCtrl.getOneVenue);
router.put('/:id', auth, venueCtrl.modifyVenue);
router.delete('/:id', auth, venueCtrl.deleteVenue);

module.exports = router;