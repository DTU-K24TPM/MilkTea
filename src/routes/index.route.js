var siteRouter = require('./site.route')
var authRouter = require('./auth.route')
var cartRouter = require('./cart.route')
function route(app){
    app.use('/',siteRouter)
    app.use('/auth',authRouter)
    app.use('/cart',cartRouter)
}
module.exports = route