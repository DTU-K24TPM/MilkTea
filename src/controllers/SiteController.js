
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
        res.render('login')
    }
    //[POST] /login
    postLogin(req,res){
        var email= req.body.email
        var password = req.body.password
        var sql = `SELECT * FROM users WHERE email= '${email}'`
        con.query(sql, (err,results) => {
            console.log(results)
            if(err) throw err;
            if(results[0].password==password){
                console.log("Dang nhap thanh cong")
                res.redirect('/')
            }else console.log('Dang nhap that bai')
        })
    }
    forgot(req,res){
        res.render('forgot')
    }
    postForgot(req,res){
        var email= req.body.email
        var sql = `SELECT * FROM users WHERE email= '${email}'`
        
        con.query(sql, (err,results) => {          
            if(err) throw err;
            if(results.length===1){
                var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                    from: 'testdoan124@gmail.com',
                    to: email,
                    subject: 'Quên mật khẩu',
                    text: `Mật khẩu của bạn là: ${results[0].password}`
                }
                transporter.sendMail(mainOptions, function(err, info){
                    if (err) {
                        console.log(err);
                        res.redirect('/');
                    } else {
                        console.log('Message sent: ' +  info.response);
                        res.redirect('/');
                    }
                });
            }else {
                console.log('Email khong ton tai')
                res.render('forgot')
            }
        })
        
    }
}

module.exports = new SiteControler