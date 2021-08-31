var siteRouter = require('./site.route')
var authRouter = require('./auth.route')
var cartRouter = require('./cart.route')
var productRouter = require('./product.route')
var checkuser = require('../controllers/checkuser.middleware')
function route(app){
    app.use('/auth',authRouter)
    app.use('/cart',cartRouter)
    app.use('/product',productRouter)
    app.use('/',checkuser.checkUser,siteRouter)
}
module.exports = route