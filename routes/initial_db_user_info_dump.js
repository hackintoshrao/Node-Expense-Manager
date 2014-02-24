var core= require('../CORE-API/coreOps');
var fs = require('fs');
exports.initialize = function(){

  var roomies_info=fs.readFileSync('./addroomie.js','utf-8');
  console.log(JSON.parse(roomies_info));
  var roomies_info = JSON.parse(roomies_info);
  if(roomies_info.flag){
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
  	for(var i=0;i<roomies_info.roomies.length;i++){
  			core.addUser("users",roomies_info.roomies[i].username,function(err,result){
  				if(err)
  					throw err;
  				else
  			    	console.log("roomie Added");
  			});
  	}
  	for(var i=0;i<roomies_info.roomies.length;i++){
  		core.addUserInfo("userInfo",roomies_info.roomies[i].username,roomies_info.roomies[i].mail,function(err,result){
  			if(err)
  				throw err;
  			else  			
  		    	console.log("User Info added");
  			});
  		}
  	}
}