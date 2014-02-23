exports.settleExpense = function(req, res){
        if(!req.session.name)
  			res.redirect("modal/");
  		else
  			res.render('settlement');
};