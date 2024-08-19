
module.exports = function admin(req, res, next){
    if(!req.user.isAdmin)
        res.status(403).send("morojaat rad etildi !");

    next();
}