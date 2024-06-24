const express = require("express");
const router = express.Router();
const venueCtrl = require("../controllers/venue");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/", venueCtrl.getVenues);

router.get("/new", venueCtrl.getNewVenue);
router.post("/new", venueCtrl.postNewVenue);

router.get("/edit/:id", venueCtrl.getEditVenue);
router.post("/edit/:id", venueCtrl.postEditVenue);

router.get("/:id", venueCtrl.viewVenue);

router.get("/delete/:id", venueCtrl.deleteVenue);

module.exports = router;
