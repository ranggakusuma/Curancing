const express = require('express')
const UserController = require('../controllers/UserController')
const middleWare = require('../middleware/loginMiddleware')

const router = express.Router()

router.get('/', middleWare, UserController.registerForm)

router.post('/', UserController.registerAdd)

module.exports = router