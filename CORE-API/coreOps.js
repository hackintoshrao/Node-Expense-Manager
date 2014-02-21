var client = require('redis').createClient();

client.on("error", function (err) {
    console.error(err);
});
/*API to add a participant*/
exports.addUser= function(setkey,value,callback){
    client.select(1, function (err) {
        if (err) {
            return callback(err);
        }

        client.sadd(setkey, value, function (err,reply) {
            if (err) {
                return callback(err);
            }
            
            callback(null, reply);

        });
    });
}

/*API to remove a participant */
exports.remUser= function(setkey,value,callback){
    client.select(1, function (err) {
        if (err) {
            return callback(err);
        }

        client.srem(setkey,value, function (err,reply) {
            if (err) {
                return callback(err);
            }

            callback(null, reply);

        });
    });
}

exports.addExpense = function(hashId,hashKey,hashValue,callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.hset(hashId,hashKey,hashValue,function(err,reply){
            if(err){
                return callback(err);
            }
            callback(null,reply);
        });
    });
}

exports.remExpense = function(hashId,key,callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.hdel(hashId,key,function(err,reply){
            if(err){
                return callback(err);
            }
            callback(null,reply);
        });
       
    });
}


exports.readExpense = function(hashId,callback){
    client.select(1,function(err){
        if(err)
            return callback(err);
        client.hgetall(hashId,function(err,reply){
            if(err)
                return callback(err);
           
            callback(null,reply);
        });
    });
}

exports.incr_no_of_expenses = function(callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.incr("totalNoOfExpenses",function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}
exports.decr_no_of_expenses = function(callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.decr("totalNoOfExpenses",function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}
exports.get_no_of_expenses = function(callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.get("totalNoOfExpenses",function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}


exports.del_no_of_expenses = function(callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.del("totalNoOfExpenses",function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}














