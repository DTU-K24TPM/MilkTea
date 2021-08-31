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
    search(req,res){
        var key = req.query.product;
        console.log(key)
        var sql = `SELECT * FROM products where Id not in (select Id from products where CategoryId = 6 or CategoryId = 7)`;
        con.query(sql, (err,results) => {
            if(err) throw err;
            //console.log(results)
            var newResults = results.filter(function(result){
                return result.Name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
            })
            res.render('home',{
                products : newResults             
            })
        })
    }
    
}

module.exports = new SiteControler