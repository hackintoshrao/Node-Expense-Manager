var settle_list = require("../CORE-API/settle.js");
exports.settleExpense = function(req, res){
        if(!req.session.name)
  			res.redirect("modal/");
  		else{
  			settle_list.allRoomieExpenses(function(err,result){
  				if(err)
  					throw err;
  				else{
  					console.log('Fetched the IndividualExpenses: '+ JSON.stringify(result));
  					res.render('settlement',{toSettle:JSON.stringify(result)});
  				}
  			});
  			
  		}
}

exports.clearAllExpenses = function(req,res){
	settle_list.settle_roomies_expenses(function(err,reply){
		if(reply)
			console.log("All Expenses Cleared");
	});
}

