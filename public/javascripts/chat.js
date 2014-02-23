var socket = io.connect("/");
var u_name = '';
socket.on("user_entered",function(data){
	console.log('Inside user_entered');
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

socket.on("transaction_ack",function(data){
	$('#sentMessage').append('<div class="alert alert-warning">' +'<pre>'+"Expenditure Rs."+data.amount+" incurred and is paidBy Roomie "+'<b>'+data.paidBy+'</b>'+" for "+data.description+  '</pre>' +'Expense Alert by ' + data.name + '</div>');
});
$(document).ready(function(){
	socket.emit("enter_user");
	//var auto_data = ["Rs:","PaidBy:","For:"];
	//$('#shareMessage').typeahead({source:auto_data,updater:function(item){return item;}});
	$('#shareButton').click(function(){
		console.log('Share Button Clicked');             
		var chatstring = $('#shareMessage').val();
		console.log(chatstring);		
		var result=chatstring.search(/Rs{1}:[0-9]+\sPaid{1}By{1}:[a-zA-Z]{3,}\sFor:./i);
		if(result!==-1){
			console.log("Patern Matched: "+chatstring);
			var res=chatstring.split(" ");	
			console.log(res.toString());
			var msg=res.slice(0,2);
			console.log(msg.toString());
			msg.push(res.slice(2).join(' '));
			console.log(msg.toString());
			var amt=msg[0].split(":");
			
			var user=msg[1].split(":");
			
			var desc=msg[2].split(":");
			
			var transaction={
			
			amount:amt[1],
			paidBy:user[1],
			description:desc[1],
			message:chatstring,
			name:u_name
		   };
		   console.log(transaction);
		   $('#shareMessage').val('');
		   socket.emit("expense_entered",transaction);
	}	

	else{
		

		var data = {
			message:$('#shareMessage').val(),
			type:'userMessage',
			name:u_name
		};
		socket.send(JSON.stringify(data));
		$('#shareMessage').val('');
    }
  });

});