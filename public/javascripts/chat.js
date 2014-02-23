var socket = io.connect("/");
var u_name = '';
socket.on("user_entered",function(data){
	console.log('Inside unser_entered');
	console.log(data);
	u_name=data.uname;
});
socket.on("message",function(data){
	data = JSON.parse(data);

	if(data.type==="serverMessage")
		$('#sentMessage').append('<div class="alert alert-danger">' +'<pre>'+data.message+  '</pre>' +' by ' + data.name + '</div>');
	else if(data.type==='userMessage')
		$('#sentMessage').append('<div class="alert alert-info">' +'<pre>'+data.message+  '</pre>'  +" by " + data.name + '</div>');
	else 
		$('#sentMessage').append('<div class="alert alert-success">' +'<pre>'+data.message+  '</pre>' +" by " + data.name + '</div>');
});

$(document).ready(function(){
	socket.emit("enter_user");
	$('#shareButton').click(function(){
		console.log('Share Button Clicked');

		var data = {
			message:$('#shareMessage').val(),
			type:'userMessage',
			name:u_name
		};
		socket.send(JSON.stringify(data));
		$('#shareMessage').val('');
	});
});