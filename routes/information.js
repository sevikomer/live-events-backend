const express = require("express");
const router = express.Router();
const informationCtrl = require("../controllers/information");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/", informationCtrl.getInformations);

router.get("/new", informationCtrl.getNewInformation);
router.post("/new", informationCtrl.postNewInformation);

router.get("/edit/:id", informationCtrl.getEditInformation);
router.post("/edit/:id", informationCtrl.postEditInformation);

router.get("/:id", informationCtrl.viewInformation);

router.get("/delete/:id", informationCtrl.deleteInformation);

module.exports = router;
