$('document').ready(function(){
	    //$.validate();
		$('#mymodal').modal('show');
		
		$('#save').click(function(){
			console.log("inside save");
			var roomie = $('#roomiename').val();
			console.log(roomie);
		});

	
});      