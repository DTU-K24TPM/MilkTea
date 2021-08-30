var path = require('path')
var express = require('express');
var app = express();

var handlebars = require('express-handlebars')
var port = 3000
var route = require('./routes/index.route')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('hbs',handlebars({
  extname: '.hbs'
}))
app.set('view engine','hbs')
app.set('views', path.join(__dirname,'resources','views'))

//Route init
route(app)





 

app.listen(port,function(){
    console.log(`Node server running @ http://localhost:${port}`)
});