exports.room = function(req, res){
        if(!req.session.name)
  			res.redirect("modal/");
  		else
  			res.render('chatroom');
};