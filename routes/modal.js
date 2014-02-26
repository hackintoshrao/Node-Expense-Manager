
/*
 * GET home page.
 */
var core = require('../CORE-API/coreOps.js');
exports.showModal = function(req, res){
  req.session.lastPage="";	
  res.render('modal');
};
exports.getModalData = function(req,res){
	console.log("control inside Post data ");
	console.log(req.body.roomie);
	console.log(req.body.mail );
	core.isUser("users",req.body.roomie,function(err,result){
		if(result){
			core.getUserMail("userInfo",req.body.roomie,function(err,reply){
				
				if(req.body.mail===reply){
					req.session.name = req.body.roomie;
					res.redirect('/');
				}else{
					console.log("Mail Id incorrect");
					res.render('modal');

				}
			});
		}else{
			console.log("User Name is incorrect");
			res.render('modal');
		}
	});
	
}