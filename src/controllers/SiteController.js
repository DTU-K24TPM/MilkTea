var con = require('../db/index')
class SiteControler{
    //[GET] /
    home(req,res){
        var sql = `SELECT * FROM products where Id not in (select Id from products where CategoryId = 6 or CategoryId = 7)`;
        con.query(sql, (err,results) => {
            if(err) throw err;
            res.render('home',{
                products : results             
            })
        })
       
    }
    
}

module.exports = new SiteControler