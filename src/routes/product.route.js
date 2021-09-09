var express = require('express')
var middleware = require('../middlewares/login.middleware')
var router = express.Router()

var ProductController = require('../controllers/ProductController')

router.get('/:id',ProductController.detail)
router.get('/',ProductController.show)
router.get('/category/:id',ProductController.category)
router.post('/',middleware.checkLogin,ProductController.postProduct)
module.exports = router