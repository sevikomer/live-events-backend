const express = require('express');
const router = express.Router();

const informationApiCtrl = require('../../controllers/informationApi');
const authAPI = require('../../middleware/authAPI');

router.get('/', informationApiCtrl.getAllInformations);
router.post('/new', authAPI, informationApiCtrl.createInformation);
router.get('/:id', informationApiCtrl.getOneInformation);
router.put('/:id', authAPI, informationApiCtrl.modifyInformation);
router.delete('/:id', authAPI, informationApiCtrl.deleteInformation);

module.exports = router;