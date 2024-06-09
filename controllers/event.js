const Event = require('../models/Event');
const fs = require('fs');

exports.createEvent = (req, res, next) => {
    const eventObject = JSON.parse(req.body.event);
    delete eventObject._id;
    delete eventObject._userId;
    const event = new Event({
        ...eventObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    event.save()
        .then(() => { res.status(201).json({ message: 'Event enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.getOneEvent = (req, res, next) => {
    Event.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyEvent = (req, res, next) => {
    const eventObject = req.file ? {
        ...JSON.parse(req.body.event),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete eventObject._userId;
    Event.findOne({ _id: req.params.id })
        .then((event) => {
            if (event.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Event.updateOne({ _id: req.params.id }, { ...eventObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Event modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteEvent = (req, res, next) => {
    Event.findOne({ _id: req.params.id })
        .then(event => {
            if (event.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = event.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Event.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Event supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

exports.getAllEvents = (req, res, next) => {
    Event.find().then(
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