const express = require('express')
const UserController = require('../controllers/UserController')

const router = express.Router()

router.get('/', UserController.registerForm)

router.post('/', UserController.registerAdd)

module.exports = router