			var core = require('./coreOps.js');
			var new_to_be_paid,neg_share ;			
		     exports.transaction = function(data,callback){				
			
				core.getUsers("users",function(err,reply){
	 					console.log("User from settle: "+reply.toString());
	 					var share = (data.amount/reply.length);
	 					for(var i=0;i<reply.length;i++){
	 						if(reply[i]===data.paidBy){
	 							console.log("only once for: "+reply[i]);
	 							core.get_a_roomies_expense(data.paidBy,function(err,result){
	 								if(err)
	 									throw err;
	 								for(var j=0;j<reply.length;j++){
	 									if(reply[j]!==data.paidBy){
	 										console.log("inside new Transaction:"+JSON.stringify(result));
	 										
	 										console.log("old_iyer:"+result["iyer"]+"replayer:"+result[reply[j].toString()]);
	 										console.log("old_rao:"+result["rao"]+"replayer:"+result[reply[j].toString()]);
	 										new_to_be_paid = parseInt(result[reply[j].toString()])+share;
	 										console.log("new amount"+new_to_be_paid);
	 										core.set_roomie_expense(data.paidBy,reply[j],new_to_be_paid,function(err,reply){
	 											if(reply)
	 												console.log('Positive share added');
	 										});
	 									}
	 								}
	 							});
	 						}else{
	 							
	 							console.log("Inside Else of expenses: "+reply[i]+": "+data.paidBy);
	 							core.get_a_roomies_expense(reply[i],function(err,result_neg){
	 								if(err)
	 									throw err;
	 								
	 								
	 								neg_share = (share * -1) + (parseInt(result_neg[data.paidBy]));
	 								console.log("New negative Share:"+ result_neg["name"]+":"+data.paidBy+":"+neg_share);
	 								core.set_roomie_expense(result_neg["name"],data.paidBy,neg_share,function(err,reply){
	 									if(reply)
	 										console.log('negative share added');
	 								});	
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