const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log('unauthorized try');
        next();
    } catch (error) {
        console.log('unauthorized catch')
        next();
    }
};
