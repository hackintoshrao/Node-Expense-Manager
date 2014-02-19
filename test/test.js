var assert = require("assert");
var core=require("../CORE-API/coreOps.js");
/* */
describe('COREAPI Testing', function (){
    describe('addUser', function (){
        it('should return 1 if the user is added successfully', function(done) {

            core.addUser("users","karthic",function (err, result) {
                if(err)
                	return done(err);
                assert.equal(result, 1);
                done();
            });
        });
    });
    describe('Testing Adding expenses ',function(){
        it('should return 1 if added successfully',function(done){
            var date = new Date();
            core.addExpense("expense_1",100,"Breakfast","karthic",date.toString(),function(err,result){
                if(err)
                    return done(err);
                assert.equal(result,1);
            });
        });
    });
  describe('remUser', function (){
        it('should return 1 if the user is removed successfully', function(done) {

            core.remUser("users","karthic",function (err, result) {
                if(err)
                	return done(err);
                assert.equal(result, 1);
                done();
            });
        });
    });
});


