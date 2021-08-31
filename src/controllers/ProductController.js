var con = require('../db/index')
class ProductControler{
    //[GET] products/
    show(req,res){
        var sql = `SELECT * FROM products where Id not in (select Id from products where CategoryId = 6 or CategoryId = 7)`;
        con.query(sql, (err,results) => {
            if(err) throw err;
            res.render('product/show',{
                products : results             
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

module.exports = new ProductControler