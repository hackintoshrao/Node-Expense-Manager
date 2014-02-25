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

exports.isUser = function(setkey,value,callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.sismember(setkey,value,function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}
exports.getUsers = function(setkey,callback){
    client.select(1,function(err){
        if(err)
            callback(err)
        client.smembers(setkey,function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}
exports.delUser = function(setkey,value,callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.srem(setkey,value,function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
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
exports.incr_no_of_users = function(callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.incr("no_of_users",function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}
exports.set_no_of_users = function(num,callback){
    client.select(1,function(err){
        if(err)
            return callback(err);
        client.set("no_of_users",num,function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}
exports.decr_no_of_users = function(callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.decr("no_of_users",function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}

exports.get_no_of_users = function(callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.get("no_of_users",function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}


exports.del_no_of_users = function(callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.del("no_of_users",function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}

exports.addUserInfo = function(hashId,hashKey,hashValue,callback){
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


exports.delUserInfo = function(hashId,hashKey,callback){
    client.select(1,function(err){
        if(err){
            return callback(err);
        }
        client.hdel(hashId,hashKey,function(err,reply){
            if(err){
                return callback(err);
            }
            callback(null,reply);
        });
    });
}
exports.getUserMail = function(hashId,hashKey,callback){
    client.select(1,function(err){
        if(err)
            return callback(err);
        client.hget(hashId,hashKey,function(err,reply){
            if(err)
                return callback(err);
            callback(null,reply);
        });
    });
}

exports.set_roomie_expense = function(hashId,hashKey,value,callback){
    client.select(1,function(err){
        if(err)
            return callback(err);
        client.hset(hashId,hashKey,value,function(err,reply){
            if(err)
                return callback(err);
            callback(err,reply);
        });
    });
}
exports.del_roomie_expense = function(hashId,hashKey,value,callback){
    client.select(1,function(err){
        if(err)
            return callback(err);
        client.hdel(hashId,hashKey,function(err,reply){
            if(err)
                return callback(err);
            callback(err,reply);
        });
    });
}


exports.get_a_roomies_expense = function(hashId,callback){
    client.select(1,function(err){
        if(err)
            return callback(err);
        client.hgetall(hashId,function(err,reply){
            if(err)
                return callback(err);
            callback(err,reply);
        });
    });
}







