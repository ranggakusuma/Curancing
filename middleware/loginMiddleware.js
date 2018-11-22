let middleWare = function(req, res, next){
    if(req.session.userLogin) {
        res.send('udah login')
    } else {
        next()
    }
}


module.exports = middleWare