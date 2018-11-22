let middleWare = function(req, res, next){
    if(req.session.adminLogin) {
        res.redirect('/admin')
    } else {
        next()
    }
}


module.exports = middleWare