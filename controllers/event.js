const Event = require("../models/Event");
const Venue = require("../models/Venue");

async function getEvents(req, res) {
    const events = await Event.find().populate("venue").exec();
    const venues = await Venue.find({ category: "scene" }).exec();
    res.render("event", { events, venues });
}

function getNewEvent(req, res) {
    res.render("add-event");
}

function postNewEvent(req, res) {
    const errors = checkEventInputs(req);

    if (errors.length > 0) {
        res.render("add-event", {
            event: {
                image: req.body.image,
                title: req.body.title,
                venue: req.body.venue,
                start_date: req.body.start_date,
            },
            errors: errors,
        });
        return;
    }

    const event = new Event({
        image: req.body.image,
        title: req.body.title,
        venue: req.body.venue,
        start_date: req.body.start_date,
    });

    event
        .save()
        .then(() => {
            res.redirect("/event");
        })
        .catch((err) => {
            res.render("event", {
                errors: [
                    "Une erreur est survenue lors de l'enregistrement des données.",
                ],
            });
        });
}

function viewEvent(req, res) {
    const id = req.params.id;

    Event.findById(id)
        .populate('venue')
        .then((event) => {
            if (event) {
                res.render("view-event", { event });
            } else {
                res.redirect("/");
            }
        })
        .catch((err) => {
            res.redirect("/");
        });
}

async function getEditEvent(req, res) {
    try {
        const event = await Event.findById(req.params.id).lean().populate("venue").exec();
        const venues = await Venue.find({ category: "scene" }).exec();
        if (!event) {
            res.redirect("/");
            return;
        }

        res.render("edit-event", { event, venues });
    } catch (error) {
        res.redirect("/");
    }
};

async function postEditEvent(req, res) {
    const event = await Event.findById(req.params.id).populate('venue');

    if (!event) {
        res.redirect("/event");
        return;
    }

    const errors = checkEventInputs(req);

    if (errors.length > 0) {
        res.render("edit-event", { event: event, errors: errors });
        return;
    }

    event.image = req.body.image;
    event.title = req.body.title;
    event.venue = req.body.venue;
    event.start_date = req.body.start_date;

    event
        .save()
        .then(() => {
            res.redirect("/event");
        })
        .catch((err) => {
            console.log(err);
        });
}

async function deleteEvent(req, res) {
    await Event.findByIdAndDelete(req.params.id).catch(() => null);
    res.redirect("/event");
}

function checkEventInputs(req) {
    const errors = [];

    const image = req.body.image;
    const title = req.body.title;
    const venue = req.body.venue;
    const start_date = req.body.start_date;

    if (typeof image === "undefined" || image === "") {
        errors.push("Vous devez renseigner une image");
    }

    if (typeof title === "undefined" || title === "") {
        errors.push("Vous devez renseigner un titre");
    }

    if (typeof venue === "undefined" || venue === "") {
        errors.push("Vous devez renseigner un lieu");
    }

    if (typeof start_date === "undefined" || start_date === "") {
        errors.push("Vous devez renseigner une date de début");
    }

    return errors;
}

module.exports = {
    getEvents,
    getNewEvent,
    postNewEvent,
    viewEvent,
    getEditEvent,
    postEditEvent,
    deleteEvent,
};
