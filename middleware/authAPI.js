const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req?.headers?.authorization) {
            const token = req.headers.authorization.replace('Bearer ', "");
            console.log("🚀 ~ token:", token)
            const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
            console.log("🚀 ~ decodedToken:", decodedToken)
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
