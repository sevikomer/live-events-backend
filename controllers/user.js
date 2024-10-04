const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

function signup(req, res, next) {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            res.status(500).json({ error })
        });
};

function login(req, res, next) {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'Mot de passe incorrect !' });
                        } else {
                            req.session.userLogged = true;
                            res.redirect("/");
                        }
                    })
                    .catch(error => {
                        res.redirect("/login");
                    });
            }
        })
        .catch(error => res.redirect("/login"));
};


function getConnection(req, res) {
    if (req.session.userLogged) {
        res.redirect("/");
        return;
    }

    else res.render("login");
}

function getHome(req, res) {
    if (!req.session.userLogged) {
        res.redirect("/login");
    }

    else res.render("home");

}

function logoutUser(req, res) {
    req.session.userLogged = false;
    res.redirect("/login")
}

module.exports = { getConnection, getHome, logoutUser, signup, login };



