
/*
 * GET home page.
 */

exports.index = function(req, res){
        if(!req.session.name)
  			res.redirect("modal/");
  		else
  			res.render('home',{name:req.session.name});
};