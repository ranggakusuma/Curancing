const express = require('express')
const middleWare = require('../middleware/adminLoginMW')
const router = express.Router()


router.get('/', (req, res) => {
    // res.send(req.session.userLogin)
    res.render('./index.ejs', {title: 'Home Page', userLogin: req.session.userLogin, success:req.query.success})
})



module.exports = router