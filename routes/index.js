
/*
 * GET home page.
 */

exports.index = function(req, res){
        if(!req.session.name)
  			res.redirect("modal/");
  		
  		req.session.lastPage="";
  		res.render('home',{name:req.session.name});
};