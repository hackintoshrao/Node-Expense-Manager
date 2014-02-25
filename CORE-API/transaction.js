			var core = require('./coreOps.js')			
		     exports.transaction = function(data,callback){				
			
				core.getUsers("users",function(err,reply){
	 					console.log("User from settle: "+reply.toString());
	 					var share = (data.amount/reply.length);
	 					for(var i=0;i<reply.length;i++){
	 						if(reply[i]===data.paidBy){
	 							console.log("only once for: "+reply[i]);
	 							for(var j=0;j<reply.length;j++){
	 								if(reply[j]!==data.paidBy){
	 									console.log(data.paidBy+":"+reply[j]+":"+share);
	 									core.set_roomie_expense(data.paidBy,reply[j],share,function(err,reply){
	 										if(reply)
	 											console.log('Positive share added');
	 									});
	 								}
	 							}
	 						}else{
	 							var neg_share = share * -1;
	 							console.log(reply[i]+":"+data.paidBy+":"+neg_share);
	 							core.set_roomie_expense(reply[i],data.paidBy,neg_share,function(err,reply){
	 								if(reply)
	 									console.log('negative share added');
	 							});
	 						}

	 					}
	 			});
			}

			exports.add_expense_summary = function(data,callback){
					var date = new Date();
	 				core.incr_no_of_expenses(function(err,incr_reply){
	 					if(incr_reply){
	 						var expenses_no = "expense_"+incr_reply;
	 						core.addExpense(expenses_no,"amount",data.amount,function(err,reply){
	 							console.log("Amount added to the database");
	 						});
	 						core.addExpense(expenses_no,"paidBy",data.paidBy,function(err,reply){
	 							console.log("PaidBy added to the database");
	 						});
	 						core.addExpense(expenses_no,"description",data.description,function(err,reply){
	 							console.log("description added to the database");
	 						});

	 						core.addExpense(expenses_no,"date",date.toString(),function(err,reply){
	 							console.log("date added to the database");
	 						});
	 						
	 					}
	 				});
			}