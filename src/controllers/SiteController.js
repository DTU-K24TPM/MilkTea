var con = require('../db/index')
class SiteControler{
    //[GET] /
    home(req,res){
        var sql = `SELECT * FROM products`;
        con.query(sql, (err,results) => {
            if(err) throw err;
            res.render('home',{
                products : results             
            })
        })
       
    }
    
}

module.exports = new SiteControler