var siteRouter = require('./site.route')
var authRouter = require('./auth.route')
function route(app){
    app.use('/',siteRouter)
    app.use('/auth',authRouter)
}
module.exports = route