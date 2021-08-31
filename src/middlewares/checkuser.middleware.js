
var con = require('../db/index')

class CheckUserMiddleware{
    checkUser(req,res,next){        
        var id= req.cookies.Id;
        var sql = `SELECT * FROM customers WHERE Id= '${id}'`
        con.query(sql, (err,results) => {            
            res.locals.user = results[0]
            next();
    })
}
}

module.exports = new CheckUserMiddleware