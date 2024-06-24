const Venue = require("../models/Venue");

function getVenues(req, res) {
    Venue.find()
        .then((venues) => {
            res.render("venue", { venues: venues });
        })
        .catch((err) => {
            console.log(err);
        });
}

function getNewVenue(req, res) {
    res.render("add-venue");
}

function postNewVenue(req, res) {
    const errors = checkVenueInputs(req);

    if (errors.length > 0) {
        res.render("add-venue", {
            venue: {
                name: req.body.name,
                category: req.body.category,
                lat: req.body.lat,
                lng: req.body.lng,
            },
            errors: errors,
        });
        return;
    }

    const venue = new Venue({
        name: req.body.name,
        category: req.body.category,
        lat: req.body.lat,
        lng: req.body.lng,
    });

    venue
        .save()
        .then(() => {
            res.redirect("/venue");
        })
        .catch((err) => {
            res.render("venue", {
                errors: [
                    "Une erreur est survenue lors de l'enregistrement des données.",
                ],
            });
        });
}

function viewVenue(req, res) {
    const id = req.params.id;

    Venue.findById(id)
        .then((venue) => {
            if (venue) {
                res.render("view-venue", { venue: venue });
            } else {
                res.redirect("/");
            }
        })
        .catch((err) => {
            res.redirect("/");
        });
}

function getEditVenue(req, res) {

    Venue.findById(req.params.id)
        .then((venue) => {
            if (!venue) {
                res.redirect("/");
                return;
            }

            res.render("edit-venue", { venue: venue });
        })
        .catch(() => {
            res.redirect("/");
        });
}

async function postEditVenue(req, res) {

    const venue = await Venue.findById(req.params.id);

    if (!venue) {
        res.redirect("/venue");
        return;
    }

    const errors = checkVenueInputs(req);

    if (errors.length > 0) {
        res.render("edit-venue", { venue: venue, errors: errors });
        return;
    }

    venue.name = req.body.name;
    venue.category = req.body.category;
    venue.lat = req.body.lat;
    venue.lng = req.body.lng;

    venue
        .save()
        .then(() => {
            res.redirect("/venue");
        })
        .catch((err) => {
            console.log(err);
        });
}

async function deleteVenue(req, res) {
    await Venue.findByIdAndDelete(req.params.id).catch(() => null);
    res.redirect("/venue");
}

function checkVenueInputs(req) {
    const errors = [];

    const name = req.body.name;
    const category = req.body.category;
    const lat = req.body.lat;
    const lng = req.body.lng;

    if (typeof name === "undefined" || name === "") {
        errors.push("Vous devez renseigner un nom");
    }

    if (typeof category === "undefined" || category === "") {
        errors.push("Vous devez renseigner une catégorie");
    }

    if (typeof lat === "undefined" || lat === "") {
        errors.push("Vous devez renseigner une latitude");
    }

    if (typeof lng === "undefined" || lng === "") {
        errors.push("Vous devez renseigner une longitude");
    }

    return errors;
}

module.exports = {
    getVenues,
    getNewVenue,
    postNewVenue,
    viewVenue,
    getEditVenue,
    postEditVenue,
    deleteVenue,
};
