const express = require('express')
const userAccess = require('../middleware/userAccess')
const UserController = require('../controllers/UserController')

const router = express.Router()

router.get('/', userAccess, UserController.finCat)
router.get('/beli/:id', userAccess, UserController.beli)
router.get('/checkout/:id', userAccess, UserController.checkOut)

module.exports = router