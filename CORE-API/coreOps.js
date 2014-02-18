var redis = require('redis');

exports.addUser= function(){
	var client = redis.createClient();
	client.on("error",function(err){
		console.log('Error'+ err);
	});
	client.select(1);
	return 0;
	/*client.sadd(set-key,item,function(err,reply){
		console.log(reply);
	});*/
}