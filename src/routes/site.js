var express = require('express')
var router = express.Router()

var siteController = require('../controllers/SiteController')

router.get('/',siteController.home)

router.get('/login',siteController.login)
router.post('/login',siteController.postLogin)
router.get('/forgot',siteController.forgot)
router.post('/forgot',siteController.postForgot)
module.exports = router