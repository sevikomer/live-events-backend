const Venue = require('../models/Venue');

exports.createVenue = (req, res, next) => {
    const venue = new Venue({
        name: req.body.name,
        category: req.body.category,
        lat: req.body.lat,
        lng: req.body.lng
    });
    venue
        .save()
        .then((venue) => { res.status(201).json(venue) })
        .catch((error) => { res.status(400).json({ error: error }) });
};

exports.getOneVenue = (req, res, next) => {
    Venue.findOne({ _id: req.params.id })
        .then((venue) => { res.status(200).json(venue) })
        .catch((error) => { res.status(404).json({ error: error }) });
};

exports.modifyVenue = (req, res, next) => {
    const venue = new Venue({
        name: req.body.name,
        category: req.body.category,
        lat: req.body.lat,
        lng: req.body.lng
    });
    Venue.updateOne({ _id: req.params.id }, venue)
        .then((venue) => { res.status(201).json(venue) })
        .catch((error) => { res.status(400).json({ error: error }) });
};

exports.deleteVenue = (req, res, next) => {
    Venue.deleteOne({ _id: req.params.id })
        .then((venue) => { res.status(200).json(venue) })
        .catch((error) => { res.status(400).json({ error: error }) });
};

exports.getAllVenues = (req, res, next) => {
    Venue.find()
        .then((venues) => { res.status(200).json(venues) })
        .catch((error) => { res.status(400).json({ error: error }) });
};