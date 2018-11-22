const express = require('express')
const AdminController = require('../controllers/AdminController')
const adminLoginMW = require('../middleware/adminLoginMW')
const adminLogout = require('../middleware/adminLogout')
const adminAccess = require('../middleware/adminAccess')
const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/', adminAccess, AdminController.dashBoard)

router.get('/login', adminLoginMW, AdminController.adminForm)
router.post('/login', AdminController.adminLogin)
router.get('/logout', adminLogout, AdminController.logout)
router.get('/add-cat', adminAccess, AdminController.addForm)
router.post('/add-cat', adminAccess, upload.single('picture'), AdminController.addCat)
router.get('/all-cat',  adminAccess, AdminController.allCat)
router.get('/delete-cat/:id',  adminAccess, AdminController.deleteCat)
router.get('/edit-cat/:id',  adminAccess, AdminController.editCatForm)
router.post('/edit-cat/:id',  adminAccess, AdminController.editCatUpdate)



module.exports = router