var siteRouter = require('./site.route')
var authRouter = require('./auth.route')
var cartRouter = require('./cart.route')
var checkuser = require('../controllers/checkuser.middleware')
function route(app){
    app.use('/',checkuser.checkUser,siteRouter)
    app.use('/auth',authRouter)
    app.use('/cart',cartRouter)
}
module.exports = route