var express = require('express')
var router = express.Router()

var ProductController = require('../controllers/ProductController')

router.get('/:id',ProductController.detail)
router.get('/',ProductController.show)
router.get('/category/:id',ProductController.category)

module.exports = router