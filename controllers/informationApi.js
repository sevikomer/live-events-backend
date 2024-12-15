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
    Information.findOneAndUpdate(
        { _id: req.params.id },
        information,
        { new: true } // Retourner le document mis à jour
    )
        .then((updatedInformation) => {
            if (!updatedInformation) {
                return res.status(404).json({ message: 'Information not found' });
            }
            res.status(200).json(updatedInformation);  // Retourner l'information mis à jour
        })
        .catch(error => res.status(401).json({ error }));
};

exports.deleteInformation = (req, res, next) => {
    Information.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Information not found' });
            }
            res.status(200).send(`Information with id ${req.params.id} deleted`);
        })
        .catch(error => res.status(400).json({ error }));
};

exports.getAllInformations = (req, res, next) => {
    Information.find()
        .then((informations) => { res.status(200).json(informations) })
        .catch((error) => { res.status(400).json({ error: error }) });
};