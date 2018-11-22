const express = require('express')
const middleWare = require('../middleware/adminLoginMW')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('./index.ejs', {title: 'Home Page'})
})



module.exports = router