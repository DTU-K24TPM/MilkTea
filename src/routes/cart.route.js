var express = require('express')
var middleware = require('../middlewares/login.middleware')
var router = express.Router()

var CartController = require('../controllers/CartController')

router.get('/cartView',middleware.checkLogin,CartController.show)


module.exports = router