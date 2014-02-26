var io = require('socket.io');
var core = require("../CORE-API/coreOps.js");
var transaction = require("../CORE-API/transaction.js");
var name ; 
exports.renderroom = function(req, res){
        if(!req.session.name)
  			res.redirect("modal/");
  		name = req.session.name;
  		req.session.lastPage="";
  		res.render('chatroom');

};

exports.initialize = function(server){
	 io = io.listen(server);
	 io.sockets.on("connection",function(socket){
	 	
	 	  socket.on("message",function(message){
	 		message = JSON.parse(message);
	 		console.log(message.name);
	 		
	 		
	 		if(message.type === "userMessage"){
	 			socket.broadcast.send(JSON.stringify(message));
	 			message.type = "myMessage";
	 			socket.send(JSON.stringify(message)); 
	 		}
	 	  });
	 	  socket.on("enter_user",function(){
	 		var welcome = {
			message:'Entered the Roomies Chatroom',
			type:'serverMessage',
			name:name
			};
			console.log(name);
			socket.emit("user_entered",{uname:name});
			socket.broadcast.send(JSON.stringify(welcome));
	 	});
	 	  socket.on("expense_entered",function(data){
	 		console.log(data);
	 		core.isUser("users",data.paidBy,function(err,reply){
	 			console.log(data.paidBy+":Is a valid User");
	 			if(reply){//PaidBy is valid 
	 				var date = new Date();
	 				socket.emit("transaction_ack",data);
	 				socket.broadcast.emit("transaction_ack",data);
	 				transaction.transaction(data,function(err,sucess){
	 					if(err)
	 						throw err;
	 					if(sucess)
	 						console.log('Money to be paid by individual Roomies calculated ,transaction PART-1 sucessful');

	 				});
	 				transaction.add_expense_summary(data,function(err,success){
	 					if(err)
	 						throw err ; 
	 					if(success)
	 						console.log("transaction Part 2 sucess");
	 				});

	 			}else{ //If PaidBy is not valid
	 				data.amount="invalid";
	 				socket.emit("transaction_ack",data);
	 				socket.broadcast.emit("transaction_ack",data);
	 			}
	 		});
	 		

	 	});
	 });
}

