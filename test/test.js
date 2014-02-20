var assert = require("assert");
var core=require("../CORE-API/coreOps.js");
/*Testing asynchronous code is trickier , mocha's done() method makes it simpler  */
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
                core.addExpense("expense_1","description","Breakfast",function(err,result){
                assert.equal(result,1);
                done(); 
            });
        });
        it('should return 1 if added successfully',function(done){
                core.addExpense("expense_1","paidBy","karthic",function(err,result){
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



    
    describe('Testing read expenses',function(){
        it('should return an object containing hash(key/value pairs) ',function(done){
            core.readExpense("expense_1",function(err,result){
                assert.equal(result.amount,100);
                assert.equal(result.paidBy,"karthic");
                assert.equal(result.description,"Breakfast");
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


