var path = require('path')
var express = require('express');
var cookieParser= require('cookie-parser')
var app = express();

var handlebars = require('express-handlebars')
var port = 3000
var route = require('./routes/index.route')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.engine('hbs',handlebars({
  extname: '.hbs'
}))

app.set('view engine','hbs')
app.set('views', path.join(__dirname,'resources','views'))
var hbs = handlebars.create({})

//Custom hàm ifEquals cho HBS
hbs.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

//Route init
route(app)

app.listen(port,function(){
    console.log(`Node server running @ http://localhost:${port}`)
});

