
/*
 * GET home page.
 */

exports.showModal = function(req, res){
  res.render('modal');
};
exports.getModalData = function(req,res){
	console.log("control inside Post data ");
	console.log(req.body.roomie);
	console.log(req.body.mail );
	req.session.name = req.body.roomie;
	res.redirect('/');
}