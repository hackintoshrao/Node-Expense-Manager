var client = require('redis').createClient();

client.on("error", function (err) {
    console.error(err);
});

exports.addUser= function(callback){
    client.select(1, function (err) {
        if (err) {
            return callback(err);
        }

        client.sadd('users', 'naveen', function (err,reply) {
            if (err) {
                return callback(err);
            }
            
            callback(null, reply);

        });
    });
}


exports.remUser= function(callback){
    client.select(1, function (err) {
        if (err) {
            return callback(err);
        }

        client.srem('users', 'naveen', function (err,reply) {
            if (err) {
                return callback(err);
            }

            callback(null, reply);

        });
    });
}
