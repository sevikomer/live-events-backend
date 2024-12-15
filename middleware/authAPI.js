const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req?.headers?.authorization) {
            const token = req.headers.authorization.replace('Bearer ', "");
            const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
            const userId = decodedToken?.userId;
            if (!userId) {
                res.status(401).send();
            } else {
                next();
            }
        } else {
            res.status(401).send();
        }
    } catch (error) {
        res.status(401).send();
    }
};
