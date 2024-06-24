const Information = require("../models/Information");

function getInformations(req, res) {
    Information.find()
        .then((informations) => {
            res.render("information", { informations: informations });
        })
        .catch((err) => {
            console.log(err);
        });
}

function getNewInformation(req, res) {
    res.render("add-information");
}

function postNewInformation(req, res) {
    const errors = checkInformationInputs(req);

    if (errors.length > 0) {
        res.render("add-information", {
            information: {
                title: req.body.title,
                content: req.body.content,
            },
            errors: errors,
        });
        return;
    }

    const information = new Information({
        title: req.body.title,
        content: req.body.content,
    });

    information
        .save()
        .then(() => {
            res.redirect("/information");
        })
        .catch((err) => {
            res.render("information", {
                errors: [
                    "Une erreur est survenue lors de l'enregistrement des données.",
                ],
            });
        });
}

function viewInformation(req, res) {
    const id = req.params.id;

    Information.findById(id)
        .then((information) => {
            if (information) {
                res.render("view-information", { information: information });
            } else {
                res.redirect("/");
            }
        })
        .catch((err) => {
            res.redirect("/");
        });
}

function getEditInformation(req, res) {

    Information.findById(req.params.id)
        .then((information) => {
            if (!information) {
                res.redirect("/");
                return;
            }

            res.render("edit-information", { information: information });
        })
        .catch(() => {
            res.redirect("/");
        });
}

async function postEditInformation(req, res) {

    const information = await Information.findById(req.params.id);

    if (!information) {
        res.redirect("/information");
        return;
    }

    const errors = checkInformationInputs(req);

    if (errors.length > 0) {
        res.render("edit-information", { information: information, errors: errors });
        return;
    }

    information.title = req.body.title;
    information.content = req.body.content;

    information
        .save()
        .then(() => {
            res.redirect("/information");
        })
        .catch((err) => {
            console.log(err);
        });
}

async function deleteInformation(req, res) {
    await Information.findByIdAndDelete(req.params.id).catch(() => null);
    res.redirect("/information");
}

function checkInformationInputs(req) {
    const errors = [];

    const title = req.body.title;
    const content = req.body.content;

    if (typeof title === "undefined" || title === "") {
        errors.push("Vous devez renseigner un titre");
    }

    if (typeof content === "undefined" || content === "") {
        errors.push("Vous devez renseigner un contenu");
    }

    return errors;
}

module.exports = {
    getInformations,
    getNewInformation,
    postNewInformation,
    viewInformation,
    getEditInformation,
    postEditInformation,
    deleteInformation,
};
