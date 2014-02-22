$('document').ready(function(){
		$('#mymodal').modal('show');
		
		$('#save').click(function(){
			console.log("inside save");
			var roomie = $('#roomiename').val();
			console.log(roomie);
		});
		$('#myform').validate({
			rules:{
				roomie:{
					required:true,
					minlength:3
				},
				mail:{
					required:true,
					email:true
				}
			},
			messages:{
				roomie:{
					required:"Identify yourself, dude!",
					minlength:"Too short a name to be a roomie!"
				},
				mail:{
					required:"Can't get away without entering eeeMailId!",
					email:"LOL.I know this aint a valid address format!:D"
				}
			}
		});

	
});      