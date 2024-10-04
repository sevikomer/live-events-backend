const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


function login(req, res, next) {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).send();
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).send();
                        } else {
                            return res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.RANDOM_TOKEN_SECRET,
                                    { expiresIn: '24h' }
                                )
                            });

                        }
                    })
                    .catch(error => {
                        return res.status(401).send();
                    });
            }
        })
        .catch(error => res.status(401).send());
};

module.exports = { login };



