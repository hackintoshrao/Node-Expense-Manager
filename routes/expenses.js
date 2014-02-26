var core = require('../CORE-API/coreOps.js');
var async = require('async');
/*exports.dump = function(){
	core.incr_no_of_expenses(function(err,result){
		if(result){
			core.get_no_of_expenses(function (err, result) {
                console.log('total Expenses:'+result);
                core.del_no_of_expenses(function(err,result){
                	if(result)
                		console.log("expnses no del: "+result);
                });
     });
		}
	});
	 
	
	/*core.addExpense("expense_1","amount",100,function(err,result){
                
    });

	core.addExpense("expense_1","description","Breakfast",function(err,result){
    });
	core.addExpense("expense_1","paidBy","karthic",function(err,result){
    });
	var date = new Date();
    core.addExpense("expense_1","date",date.toString(),function(err,result){
                
    });
     core.incr_no_of_expenses(function (err, result) {
                
     });
     core.addExpense("expense_2","amount",200,function(err,result){
                
    });

	core.addExpense("expense_2","description","Beer",function(err,result){
    });
	core.addExpense("expense_2","paidBy","Iyer",function(err,result){
    });
	var date = new Date();
    core.addExpense("expense_2","date",date.toString(),function(err,result){
                
    });
}*/


exports.populateExpenses = function(callback_test){
	var no_of_expenses;
	core.get_no_of_expenses(function(err,result){
		if(err)
			callback_test(err);
	if(result){	
		function makeCallBack(hashId){
			return function(callback){
				core.readExpense(hashId,function(err,result_core){
					//console.log("expense: " + result_core + "id:" + hashId  );
					callback(err,result_core);
				});
			}
		}
		no_of_expenses = result;
		
		if(no_of_expenses){
			var functions_to_call_in_sequence = new Array();
			for(var i=1;i<=no_of_expenses;i++){
				console.log(i);
				functions_to_call_in_sequence.push(makeCallBack("expense_"+i));

			}
			
			async.series(
				functions_to_call_in_sequence,
				function(err,result){
					if(err){
						console.error("Unable to fetch the expenses");
						callback_test(err);
						return;
					}
					
					callback_test(null,result);
				}

			)
		 }
      }else{
      	callback_test(null,0);
      }
  });

}