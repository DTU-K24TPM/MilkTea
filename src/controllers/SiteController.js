
class SiteControler{
    //[GET] /
    home(req,res){
        res.render('home')
    }
    
}

module.exports = new SiteControler