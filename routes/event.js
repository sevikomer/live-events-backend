const express = require("express");
const router = express.Router();
const eventCtrl = require("../controllers/event");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/", eventCtrl.getEvents);

router.get("/new", eventCtrl.getNewEvent);
router.post("/new", eventCtrl.postNewEvent);

router.get("/edit/:id", eventCtrl.getEditEvent);
router.post("/edit/:id", eventCtrl.postEditEvent);

router.get("/:id", eventCtrl.viewEvent);

router.get("/delete/:id", eventCtrl.deleteEvent);

module.exports = router;
