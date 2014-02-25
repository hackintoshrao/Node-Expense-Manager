var core= require('../CORE-API/coreOps');
var fs = require('fs');
var async = require('async');
exports.initialize = function(){

  var roomies_info=fs.readFileSync('./addroomie.js','utf-8');
  console.log(JSON.parse(roomies_info));
  var roomies_info = JSON.parse(roomies_info);
  if(roomies_info.flag){
  	core.get_no_of_expenses(function(err,reply){
  		if(reply)
  			console.log("Cannot add or delete users until expenses are seetled,Please settle all expenses before adding or deleting the User");
  		else{
  			core.del_no_of_users(function(err,reply){
  			if(err)
  				throw err;
  			else 
  				console.log("No of users deleted");
  			});
  			console.log(roomies_info.roomies.length);
  			core.set_no_of_users(roomies_info.roomies.length,function(err,reply){
			  	if(err)
		  			throw err;
		  		else 
		  			console.log("Total No of users Set")
			});
					  	
   			
  		
  			core.getUsers("users",function(err,result){
  				if(err)
  					throw err;
  				else{
  					function delete_user_hashes_CallBack(hashname,hashkey){
						return function(callback){
									core.del_roomie_expense(hashname,hashkey,function(err,result_core){
	 								callback(err,result_core);
	 							});
							}
					}

					function add_user_info_CallBack(hashname,hashkey,value){
						return function(callback){
									core.set_roomie_expense(hashname,hashkey,value,function(err,result_core){
	 								callback(err,result_core);
	 							});
							}
					}
					function add_user_info_CallBack(hashname,hashkey,value){
						return function(callback){
									core.addUserInfo(hashname,hashkey,value,function(err,result_core){
	 								callback(err,result_core);
	 							});
							}
					}


  					function makeCallBack(username){
						return function(callback){
									core.delUser("users",username,function(err,result_core){
					
										callback(err,result_core);
									});
							}
					}
					function addUserCallBack(username){
						return function(callback){
									core.addUser("users",username,function(err,result_core){
					
										callback(err,result_core);
									});
							}
					}
  					var functions_to_call_in_sequence = new Array();
  					for(var i=0;i<result.length;i++){
						for(var j=0;j<result.length;j++){
							if(result[i]!==result[j]){
								functions_to_call_in_sequence.push(delete_user_hashes_CallBack(result[i],result[j]));
							}
						}
					}

					for(var j=0;j<result.length;j++){
						
							functions_to_call_in_sequence.push(create_user_hashes_CallBack(result[j],"name",result[j]));
					}
						
					for(var j=0;j<result.length;j++){
  						
						functions_to_call_in_sequence.push(delete_user_info_CallBack("userInfo",roomies_info.roomies[j].username));
  					}
  					for(var j=0;j<roomies_info.roomies.length;j++){
  						functions_to_call_in_sequence.push(add_user_info_CallBack("userInfo",roomies_info.roomies[j].username,roomies_info.roomies[j].mail));
						
					}		
  					for(var j=0;j<result.length;j++){
  						
						functions_to_call_in_sequence.push(makeCallBack(result[j]));
  					}
  					for(var j=0;j<roomies_info.roomies.length;j++){
  						
						functions_to_call_in_sequence.push(addUserCallBack(roomies_info.roomies[j].username));
  					}
  					async.series(
  						functions_to_call_in_sequence,
  						function(err,result){
  							if(err)
  								throw err;
  							if(result)
  								console.log("All Old USers database  Deleted nad new users added successfully");
  						}


  					)

  				}
  			    	
  			});
  		  }
  		});
  	}
}























									