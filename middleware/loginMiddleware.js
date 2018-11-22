let middleWare = function(req, res, next){
    if(req.session.userLogin) {
        res.redirect('/')
    } else {
        next()
    }
}


module.exports = middleWare