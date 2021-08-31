var con = require('../db/index')
var categories;
var sql2 = `SELECT * FROM categories where Id not in (select Id from categories where Id = 6 or Id = 7)`;
con.query(sql2, (err,results) => {
    if(err) throw err;
    categories = results           
    })  

class SiteControler{
        //[GET] /
        home(req,res){
            var sql = `SELECT * FROM products LIMIT 7`
            con.query(sql, (err,results) => {                
                res.render('home',{                    
                    categories: categories,
                    products: results
                })
            })            
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
                products : newResults,
                categories:categories         
            })
        })
    }
    
}

module.exports = new SiteControler