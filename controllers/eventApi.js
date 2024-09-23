const Event = require('../models/Event');
const fs = require('fs');

exports.createEvent = (req, res, next) => {
    const event = new Event({
        image: req.body.image,
        title: req.body.title,
        start_date: req.body.start_date,
        venue: req.body.venue
    });

    event.save()
        .then((event) => { res.status(201).json(event) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.getOneEvent = (req, res, next) => {
    Event.findOne({ _id: req.params.id })
        .populate("venue")
        .then((event) => { res.status(200).json(event) })
        .catch((error) => { res.status(404).json({ error: error }) });
};

exports.modifyEvent = (req, res, next) => {
    const event = {
        image: req.body.image,
        title: req.body.title,
        start_date: req.body.start_date,
        venue: req.body.venue
    };
    Event.updateOne({ _id: req.params.id }, event)
        .then((event) => { res.status(201).json(event) })
        .catch(error => res.status(401).json({ error }));
};

exports.deleteEvent = (req, res, next) => {
    Event.deleteOne({ _id: req.params.id })
        .then((event) => { res.status(200).json(event) })
        .catch(error => res.status(401).json({ error }));
};

exports.getAllEvents = (req, res, next) => {
    Event.find().populate("venue").then(
        (events) => {
            res.status(200).json(events);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};