var express = require('express')
var router = express.Router()

var siteController = require('../controllers/SiteController')

router.get('/',siteController.home)

module.exports = router