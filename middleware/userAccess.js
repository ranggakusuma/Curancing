let userAccess = (req, res, next) => {
    if (req.session.userLogin) {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = userAccess