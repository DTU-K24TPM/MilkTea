var express = require('express')
var router = express.Router()

var AuthController = require('../controllers/AuthController')

router.get('/login',AuthController.login)
router.post('/login',AuthController.postLogin)
router.get('/forgot',AuthController.forgot)
router.post('/forgot',AuthController.postForgot)
router.get('/register',AuthController.register)
router.post('/register',AuthController.postRegister)
router.get('/logout',AuthController.logout)
module.exports = router