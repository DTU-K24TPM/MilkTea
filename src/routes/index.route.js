var siteRouter = require('./site.route')
var authRouter = require('./auth.route')
var cartRouter = require('./cart.route')
var productRouter = require('./product.route')
var checkuser = require('../middlewares/checkuser.middleware')
function route(app){
    app.use('/auth',authRouter)
    app.use('/cart',checkuser.checkUser,cartRouter)
    app.use('/product',checkuser.checkUser,productRouter)
    app.use('/',checkuser.checkUser,siteRouter)
}
module.exports = route