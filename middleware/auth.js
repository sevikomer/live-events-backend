module.exports = (req, res, next) => {
    try {
        if (req.session.userLogged) {
            next();
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        res.redirect("/login");
    }
};
