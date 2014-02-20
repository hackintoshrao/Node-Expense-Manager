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
                core.addExpense("expense_1","amount",100,function(err,result){
                assert.equal(result,1);
                done(); 
            });
        });
        it('should return 1 if added successfully',function(done){
                core.addExpense("expense_1","description",100,function(err,result){
                assert.equal(result,1);
                done(); 
            });
        });
        it('should return 1 if added successfully',function(done){
                core.addExpense("expense_1","paidBy",100,function(err,result){
                assert.equal(result,1);
                done(); 
            });
        });
        it('should return 1 if added successfully',function(done){
            var date = new Date();
            core.addExpense("expense_1","date",date.toString(),function(err,result){
                assert.equal(result,1);
                done(); 
            });
        });
    });



    describe('Testing Deleting expenses ',function(){
        it('should return 1 if deleted successfully',function(done){
                core.remExpense("expense_1","amount",function(err,result){
                assert.equal(result,1);
                done(); 
            });
        });
        it('should return 1 if removed successfully',function(done){
                core.remExpense("expense_1","description",function(err,result){
                assert.equal(result,1);
                done(); 
            });
        });
        it('should return 1 if removed successfully',function(done){
                core.remExpense("expense_1","paidBy",function(err,result){
                assert.equal(result,1);
                done(); 
            });
        });
        it('should return 1 if removed successfully',function(done){
            var date = new Date();
            core.remExpense("expense_1","date",function(err,result){
                assert.equal(result,1);
                done(); 
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


