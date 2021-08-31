var con = require('../db/index')

var categories;
var sql2 = `SELECT * FROM categories where Id not in (select Id from categories where Id = 6 or Id = 7)`;
con.query(sql2, (err,results) => {
    if(err) throw err;
    categories = results           
    })  

class ProductControler{
    //[GET] products/
    show(req,res){
        var sql = `SELECT * FROM products where Id not in (select Id from products where CategoryId = 6 or CategoryId = 7)`;
            con.query(sql, (err,results) => {
            if(err) throw err;
            res.render('product/show',{
                products : results,
                categories: categories          
            })
        })        
    }
    detail(req,res){              
        var id = req.params.id
        var sql = `SELECT * FROM products WHERE Id = '${id}'`
        con.query(sql,(err,results) => {
            if(err) throw err;
            res.render('product/detail',{
                product: results[0]
            })
        })                
    }
    category(req,res){
        var id = req.params.id
        var sql = `SELECT * FROM products WHERE CategoryId = '${id}'`
        con.query(sql,(err,results) => {
            if(err) throw err;
            res.render('product/show',{
                products: results,
                categories: categories
            })
        })                
    }
    
}

module.exports = new ProductControler