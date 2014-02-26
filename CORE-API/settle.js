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
							return callback_test(err);
							
						}
						console.log(result);
						callback_test(null,result);
					}

		    	)
	   	});
	  } else {
	  			console.log("NO Expenses");
	  			callback_test(null,0);
		  }
    
  });

}

exports.settle_roomies_expenses = function(callback_main){
	console.log("Inside Settle Roomies Expenses");
	core.getUsers("users",function(err,reply){
		if(err)
			return callback_main(err);
		console.log("outside For Loop of inserting 0");
		for(var i=0;i<reply.length;i++){
			for(var j=0;j<reply.length;j++){
				if(reply[i]!==reply[j]){
					console.log("Deleting and inserting 0 to expenses:"+j+":"+reply[j]);
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
		return callback_main(err);
	if(result){
		console.log("Inside deleting expense_ hashes ");
		function makeCallBack(hashId,hashKey){
			return function(callback){
	  					core.remExpense(hashId,hashKey,function(err,result){
	  						console.log("callback Executing remove expense_");
			 				callback(err,result);
						});	
			    }
		 }
		 function make_Clear_no_of_expense_callback(){
		 	return function call_remove_no_of_expense(callback){
		 		core.del_no_of_expenses(function(err,result){
		 			console.log("callback executing deleting no of expenses");
		 			callback(err,result);
			 	});
			 }
		} 

		var functions_to_call_in_sequence = new Array();
		
		for(var j=1;j<=result;j++){
			expense_hash = "expense_"+j;
			console.log("inside loop of deleting "+expense_hash);
			functions_to_call_in_sequence.push(makeCallBack(expense_hash,"amount"));
			functions_to_call_in_sequence.push(makeCallBack(expense_hash,"paidBy"));
			functions_to_call_in_sequence.push(makeCallBack(expense_hash,"description"));
			functions_to_call_in_sequence.push(makeCallBack(expense_hash,"date"));
			  	
		}
		functions_to_call_in_sequence.push(make_Clear_no_of_expense_callback());
		async.series(
			functions_to_call_in_sequence,
			function(err,result){
				if(result){
					console.log("All user Expenses Removed Sucessfully");
					callback_main(null,result);
				}
				if(err)
					return callback_main(err);
			}

		)
  	 } else{
  	 	callback_main(null,0);
  	 }
  });

}	