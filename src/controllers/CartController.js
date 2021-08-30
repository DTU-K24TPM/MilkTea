class CartControler{
    //[GET] /
    show(req,res){
        res.render('cart/cartView')
    }
    
}

module.exports = new CartControler