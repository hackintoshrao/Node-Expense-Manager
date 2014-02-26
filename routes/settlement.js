var settle_list = require("../CORE-API/settle.js");
exports.settleExpense = function(req, res){
        if(!req.session.name)
       			res.redirect("modal/");
  		  else{
  			   req.session.lastPage="/settlement";
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
  console.log("Inside Clear All expenses");
	if(!req.session.name || req.session.lastPage!=="/settlement")
  			res.redirect("modal/");
	settle_list.settle_roomies_expenses(function(err,reply){
		  if(reply){
			   console.log("All Expenses Cleared");
         res.redirect('/settlement');
       }
      else if(reply===0){
          console.log("No Expenses To clear");
          res.redirect('/settlement');
      }
	 });
}

