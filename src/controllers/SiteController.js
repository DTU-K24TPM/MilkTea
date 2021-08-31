var con = require('../db/index')
class SiteControler{
    //[GET] /
    home(req,res){
            res.render('home')
       }

       search(req,res){
        var key = req.query.product;
        var sql = `SELECT * FROM products where Id not in (select Id from products where CategoryId = 6 or CategoryId = 7)`;
        con.query(sql, (err,results) => {
            if(err) throw err;
            var newResults = results.filter(function(result){
                return result.Name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
            })
            res.render('product/show',{
                products : newResults             
            })
        })
    }
    
}

module.exports = new SiteControler