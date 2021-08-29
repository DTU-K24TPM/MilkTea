
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

class SiteControler{
    //[GET] /
    home(req,res){
        res.render('home')
    }
    //[GET] /login
    login(req,res){
        res.render('login', {
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
                res.redirect('/')
            }else{
                res.render('login',{
                    mes: 'Tài khoản hoặc mật khẩu không đúng',
                    layout: null,
                    values: req.body
                })
            }
        }else{
            res.render('login',{
                mes: 'Tài khoản không tồn tại',
                layout: null,
                values: req.body
            })
        }
        })
    }
    forgot(req,res){
        res.render('forgot',{
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
                        res.render('forgot',{
                            mes: 'Gửi thành công',
                            layout: null,
                            values: req.body
                        });
                    }
                });
            }else {                
                res.render('forgot',{
                    mes: 'Tài khoản không tồn tại',
                    layout: null,
                    values: req.body
                });
            }
        })
        
    }
}

module.exports = new SiteControler