exports.about = function(req, res){
        if(!req.session.name)
  			res.redirect("modal/");
  		req.session.lastPage="";
  		res.render('about');
};