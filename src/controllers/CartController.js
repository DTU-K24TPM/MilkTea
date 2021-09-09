var con = require('../db/index')
class CartControler{
    //[GET] /
    show(req,res){
        var id= req.cookies.Id
        con.query(`SELECT Cart FROM customers WHERE Id= '${id}'`, (err,results1) => {
            var cart = results1[0]
            if(cart['Cart']){
                cart=cart['Cart'].split(',')               
                for(let i =0;i<cart.length;i++){                    
                    cart[i]=cart[i].split(' ')
                }             
                var ice=[], quantity=[], where=[],money=[] 
                var wheresub=""                     
                for(let i=0;i<cart.length;i++){                        
                    if(cart[i][0] == '0') ice.push('Đá chung')
                    else if (cart[i][0]=='') ice.push('')
                    else ice.push('Đá riêng')
                    quantity.push(cart[i][1])      
                    wheresub=cart[i][2]                    
                    for(let j=3;j<cart[i].length;j++){
                        wheresub+=' OR Id='+cart[i][j]                                    
                    }
                    where.push(wheresub)                
                }    
                var sql=`SELECT * FROM products WHERE Id= ${where[0]} ORDER BY CategoryID`
                if(where.length>1)for(let i=1;i<where.length;i++){
                    sql+=` ; SELECT * FROM products WHERE Id= ${where[i]} ORDER BY CategoryID`
                }                  
                con.query(sql, (err,results) => {                     
                    if(cart.length===1){
                        var temp=[]
                        temp.push(results)
                        results=temp
                    }                    
                    for(let i=0;i<results.length;i++){
                        var cash=0
                        for(let j=0;j<results[i].length;j++)                        
                            cash+=results[i][j].UnitPrice
                        money.push(cash)                       
                    }
                    res.render('cart/cartview',{
                        products: results,
                        ice: ice,
                        quantity: quantity,
                        money: money                 
                    })
                })
            }else res.render('cart/cartview')                   
        })
        
    }
    
}

module.exports = new CartControler