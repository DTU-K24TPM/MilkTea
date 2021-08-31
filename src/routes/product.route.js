var express = require('express')
var router = express.Router()

var ProductController = require('../controllers/ProductController')

router.get('/:id',ProductController.detail)
router.get('/',ProductController.search)
router.get('/',ProductController.show)

module.exports = router