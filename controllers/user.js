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
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.RANDOM_TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

function getConnection(req, res) {
    if (req.session.userLogged) {
        res.redirect("/");
        return;
    }

    res.render("login");
}

function getHome(req, res) {
    if (!req.session.userLogged) {
        res.redirect("/login");
        return;
    }

    res.render("home");

}

async function logUser(req, res) {
    if (req.session.userLogged) return;

    const errors = [];
    const email = req.body.email;
    const password = req.body.password;

    if (typeof email === "undefined" || email === "") {
        errors.push("Le champ email est requis.");
    }

    if (typeof password === "undefined" || password === "") {
        errors.push("Le champ mot de passe est requis.");
    }

    if (errors.length > 0) {
        res.render("login", {
            errors: errors,
            email: email,
        });
        return;
    }

    const user = await User.findOne({ email: email });

    if (user != null && user.length === 0) {
        errors.push("Email ou mot de passe incorrect.");

        res.render("login", {
            errors: errors,
            email: email,
        });

        return;
    }

    if (user != null && user.password != null) {
        errors.push("Email ou mot de passe incorrect.");

        res.render("login", {
            errors: errors,
            email: email,
        });

        return;
    }

    const comparaison = await bcrypt.compare(password, user.password)

    if (!comparaison) {
        errors.push("Email ou mot de passe incorrect.");

        res.render("login", {
            errors: errors,
            email: email,
        });

        return;
    }

    req.session.userLogged = user._id;

    res.redirect("/");
}

function logoutUser(req, res) {
    req.session.userLogged = null;
    res.redirect("/login");
}

module.exports = { getConnection, getHome, logUser, logoutUser, signup, login };



