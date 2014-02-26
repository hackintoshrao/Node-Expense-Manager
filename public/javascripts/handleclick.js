$(document).ready(function(){
  		$('#home').click(function(){
  		var url="http://"+location.host+'/';
  		console.log('Home button clicked');
  		window.location=url;
  	});
  		$('#settle').click(function(){
  		var accept=confirm("Are you Sure you want to Settle all Expenes??");
  		if(accept){
			var url="http://"+location.host+'/settlement/clear';
			console.log('Settle clicked');
			window.location=url;
			}
		});
	});   