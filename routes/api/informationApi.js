const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const informationApiCtrl = require('../../controllers/informationApi');

router.get('/', auth, informationApiCtrl.getAllInformations);
router.post('/new', auth, informationApiCtrl.createInformation);
router.get('/:id', auth, informationApiCtrl.getOneInformation);
router.put('/:id', auth, informationApiCtrl.modifyInformation);
router.delete('/:id', auth, informationApiCtrl.deleteInformation);

module.exports = router;