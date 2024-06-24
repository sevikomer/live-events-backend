// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//         const userId = decodedToken.userId;
//         // if (req.body.userId && req.body.userId !== userId) {
//         //     throw 'User ID non valable !';
//         //   } else {
//         //     next();
//         //   }
//         req.auth = {
//             userId: userId
//         };
//         next();
//     } catch (error) {
//         res.status(401).json({ error });
//     }
// };

module.exports = (req, res, next) => {
    if (!req.session.userLogged) {
        return res.redirect("/login");
    }
    next();
};
