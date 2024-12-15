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
    Event.findOneAndUpdate(
        { _id: req.params.id },
        event,
        { new: true } // Retourner le document mis à jour
    )
        .then((updatedEvent) => {
            if (!updatedEvent) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.status(200).json(updatedEvent);  // Retourner l'événement mis à jour
        })
        .catch(error => res.status(401).json({ error }));
};

exports.deleteEvent = (req, res, next) => {
    Event.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.status(200).send(`Event with id ${req.params.id} deleted`);
        })
        .catch(error => res.status(400).json({ error }));
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