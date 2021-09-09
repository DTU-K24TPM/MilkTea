var con = require('../db/index')

var categories;
var sql2 = `SELECT * FROM categories where Id not in (select Id from categories where Id = 8 or Id = 7)`;
con.query(sql2, (err,results) => {
    if(err) throw err;
    categories = results           
    })  

class ProductControler{
    //[GET] products/
    show(req,res){
        var sql = `SELECT * FROM products where Id not in (select Id from products where CategoryId = 8 or CategoryId = 7)`;
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
        var sql1 = `SELECT * FROM products WHERE Id = '${id}'`
        var sql2 = `SELECT * FROM products WHERE CategoryId = 8`
        var sql3 = `SELECT * FROM products WHERE CategoryId = 7`
        con.query(sql1,(err,results1) => {
            if(results1[0].CategoryId !== 6){
            con.query(sql2,(err,results2) => {
                con.query(sql3,(err,results3) => {                          
                    res.render('product/detail',{
                        product: results1[0],
                        topping: results2,
                        sizeM: results3[0],
                        sizeL: results3[1]
                    })
                })
            })
        }
        else {
            con.query(sql3,(err,results3) => { 
            res.render('product/detail',{
                
                product: results1[0],
                sizeM: results3[0],
                sizeL: results3[1]
                    })
                })
            }
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
    postProduct(req,res){
        var topping = req.body.topping    
        var quantity = req.body.quantity  
        var ice = req.body.ice  
        var productId = req.body.productId  
        var size = req.body.size
        var cart=[]
        cart.push(ice)
        cart.push(quantity)
        cart.push(productId)
        cart.push(size)
        if(topping){
            for(let i=0;i<topping.length;i++)
                cart.push(topping[i])
        }        
        cart=cart.join(' ')   
        var id= req.cookies.Id
        con.query(`SELECT Cart FROM customers WHERE Id= '${id}'`, (err,results1) => {
            var newcart=results1[0]['Cart']
            if(newcart){
                newcart+=','+cart                
            }
            else newcart+=cart
            var sql = `UPDATE customers SET Cart = '${newcart}' WHERE Id='${id}'`
            con.query(sql, (err,results) => {   
                if(err) console.log(err)             
                res.redirect('/cart/cartView')                            
            }) 
        })       
    }
}

module.exports = new ProductControler