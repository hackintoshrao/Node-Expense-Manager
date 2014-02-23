var io = require('socket.io');
var name ; 
exports.renderroom = function(req, res){
        if(!req.session.name)
  			res.redirect("modal/");
  		name = req.session.name;
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
	 });
}

