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
        var sql1 = `SELECT * FROM products WHERE Id = '${id}'`
        var sql2 = `SELECT * FROM products WHERE CategoryId = 6`
        var sql3 = `SELECT * FROM products WHERE CategoryId = 7`
        con.query(sql1,(err,results1) => {
            con.query(sql2,(err,results2) => {
                con.query(sql3,(err,results3) => {                          
                    res.render('product/detail',{
                        product: results1[0],
                        topping: results2,
                        size: results3.slice().reverse()
                    })
                })
            })
        })                
    }
    
}

module.exports = new ProductControler