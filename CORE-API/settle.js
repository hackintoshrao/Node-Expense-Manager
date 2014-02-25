var core = require('../CORE-API/coreOps.js');

var async = require('async');


exports.allRoomieExpenses = function(callback_test){//Fetching all expenses by individual roomies
	var no_of_expenses;
	core.get_no_of_expenses(function(err,result){
		if(err)
		   	return callback_test(err);
		if(result){	
			core.getUsers("users",function(err,reply){
	 			if(err)
	 				return callback_test(err);
	 			console.log("Users from settle: "+reply.toString());
	 			function makeCallBack(hashId){
	 				return function(callback){
					core.get_a_roomies_expense(hashId,function(err,result_core){
						//console.log("expense: " + result_core + "id:" + hashId  );
						callback(err,result_core);
					});
			    }
			 }
			
			
				var functions_to_call_in_sequence = new Array();
				for(var i=0;i< reply.length;i++){
					console.log(i+".individual:"+reply[i]);
					functions_to_call_in_sequence.push(makeCallBack(reply[i]));

				}
				
				async.series(
					functions_to_call_in_sequence,
					function(err,result){
						if(err){
							console.error("Unable to fetch the individual expenses");
							callback_test(err);
							return;
						}
						console.log(result);
						callback_test(null,result);
					}

		    	)
	   	});
	  } else {
	  		callback(null,0);
		  }
    
  });

}

exports.settle_roomies_expenses = function(callback){
	core.getUsers("users",function(err,reply){
		if(err)
			return callback(err);
		for(var i=0;i<reply.length;i++){
			for(var j=0;j<reply.length;i++){
				if(reply[i]!==reply[j]){
					core.set_roomie_expense(reply[i],reply[j],0,function(err,reply){
	 					if(reply)
	 						console.log('Expense Cleared');
	 				});
				}
			}
		}	

	});
	core.get_no_of_expenses(function(err,result){
		if(err)
			return callback(err);
		for(var j=1;j<=result;j++){

			 core.remExpense("expense_"+"j","amount",function(err,result){
			 	if(err)
			 		throw err;
			 	if(result)
			 		console.log("amount deleted"); 
			
			});	
			  core.remExpense("expense_"+"j","paidBy",function(err,result){
			 	if(err)
			 		throw err;
			 	if(result)
			 		console.log("PaidBy deleted"); 
			
			});	
			   core.remExpense("expense_"+"j","description",function(err,result){
			 	if(err)
			 		throw err;
			 	if(result)
			 		console.log("Description deleted"); 
			
			});	
			    core.remExpense("expense_"+"j","date",function(err,result){
			 	if(err)
			 		throw err;
			 	if(result)
			 		console.log("Date deleted"); 
			
			});	
		}
    });
}	