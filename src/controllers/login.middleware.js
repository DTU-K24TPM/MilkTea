
var con = require('../db/index')

class LoginMiddleware{
    checkLogin(req,res,next){
        if (!req.cookies.Id){
            res.redirect('/auth/login');
            return;
        }
        var id= req.cookies.Id;
        var sql = `SELECT * FROM customers WHERE Id= '${id}'`
        con.query(sql, (err,results) => {
            if (!results.length===1) {
                res.redirect('/auth/login');
            return;
            }
            next();
    })
}
}

module.exports = new LoginMiddleware