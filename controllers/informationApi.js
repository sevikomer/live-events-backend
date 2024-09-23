const Information = require('../models/Information');

exports.createInformation = (req, res, next) => {
    const information = new Information({
        title: req.body.title,
        content: req.body.content,
    });
    information
        .save()
        .then((information) => { res.status(201).json(information) })
        .catch((error) => { res.status(400).json({ error: error }) });
};

exports.getOneInformation = (req, res, next) => {
    Information.findOne({ _id: req.params.id })
        .then((information) => { res.status(200).json(information) })
        .catch((error) => { res.status(404).json({ error: error }) });
};

exports.modifyInformation = (req, res, next) => {
    const information = {
        title: req.body.title,
        content: req.body.content,
    };
    Information.updateOne({ _id: req.params.id }, information)
        .then((information) => { res.status(201).json(information) })
        .catch((error) => { res.status(400).json({ error: error }) });
};

exports.deleteInformation = (req, res, next) => {
    Information.deleteOne({ _id: req.params.id })
        .then((information) => { res.status(200).json(information) })
        .catch((error) => { res.status(400).json({ error: error }) });
};

exports.getAllInformations = (req, res, next) => {
    Information.find()
        .then((informations) => { res.status(200).json(informations) })
        .catch((error) => { res.status(400).json({ error: error }) });
};