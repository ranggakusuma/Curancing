const express = require('express')
const UserController = require('../controllers/UserController')
const middleWare = require('../middleware/logoutMiddleware')

const router = express.Router()

router.get('/', middleWare, UserController.logout)


module.exports = router