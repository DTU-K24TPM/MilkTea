var nodemailer = require('nodemailer')
var con = require('../db/index')


var transporter =  nodemailer.createTransport({ // config mail server
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'testdoan124@gmail.com', //Tài khoản gmail
        pass: 'anhlavip1' //Mật khẩu tài khoản gmail
    },
    tls: {        
        rejectUnauthorized: false
    }
});

class AuthControler{
    
    //[GET] /login
    login(req,res){

        res.render('auth/login', {
            layout: null
          })
    }

    
    //[POST] /login
    postLogin(req,res){
        var email= req.body.email
        var password = req.body.password
        var sql = `SELECT * FROM customers WHERE Email= '${email}'`
        con.query(sql, (err,results) => {
            if(results.length===1){
            if(err) throw err;
            if(results[0].Password==password){    
                res.cookie('Id',results[0].Id)           
                res.redirect('/')
            }else{
                res.render('auth/login',{
                    mes: 'Tài khoản hoặc mật khẩu không đúng',
                    layout: null,
                    values: req.body
                })
            }
        }else{
            res.render('auth/login',{
                mes: 'Tài khoản không tồn tại',
                layout: null,
                values: req.body
            })
        }
        })
    }
    forgot(req,res){
        res.render('auth/forgot',{
            layout: null
          })
    }
    postForgot(req,res){
        var email= req.body.email
        var sql = `SELECT * FROM customers WHERE Email= '${email}'`
        
        con.query(sql, (err,results) => {          
            if(err) throw err;
            if(results.length===1){
                var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                    from: 'testdoan124@gmail.com',
                    to: email,
                    subject: 'Quên mật khẩu',
                    text: `Mật khẩu của bạn là: ${results[0].Password}`
                }
                transporter.sendMail(mainOptions, function(err, info){
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    } else {
                        console.log('Message sent: ' +  info.response);
                        res.render('auth/forgot',{
                            mes: 'Gửi thành công',
                            layout: null,
                            values: req.body
                        });
                    }
                });
            }else {                
                res.render('auth/forgot',{
                    mes: 'Tài khoản không tồn tại',
                    layout: null,
                    values: req.body
                });
            }
        })
        
    }
    register(req,res){
        res.render('auth/register', {
            layout: null
          })
    }
    postRegister(req,res){
        var email= req.body.email
        var password= req.body.password
        var fullname= req.body.fullname
        var gender = parseInt(req.body.gender)
        var birthday = req.body.birthday
        var sql = `SELECT * FROM customers WHERE Email= '${email}'`
        con.query(sql, (err,results) => {          
            if(err) throw err;
            if(results.length===1){                
                res.render('auth/register',{
                    mes: 'Tài khoản đã tồn tại',
                    layout: null,
                    values: req.body
                });
            }else{
                var sql = `INSERT INTO customers (Password,Fullname,Email,Gender,Birthday) VALUES ('${password}','${fullname}','${email}',${gender},'${birthday}')`
                con.query(sql, (err,results) => {
                    if(err) console.log(err)                    
                    res.render('auth/register',{
                        mes: 'Đăng ký thành công.',
                        layout: null                        
                    });                                        
                }) 
            }
        })        
    }
    
    logout(req,res){
        res.clearCookie('Id')
        res.redirect('/')
    }
}

module.exports = new AuthControler