const express = require('express')
const UserController = require('../controllers/UserController')
const middleWare = require('../middleware/loginMiddleware')

const router = express.Router()

router.get('/', middleWare, UserController.loginForm)
router.post('/', UserController.loginUser)

module.exports = router