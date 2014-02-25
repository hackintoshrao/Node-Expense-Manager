var assert = require("assert");
var core=require("../CORE-API/coreOps.js");
/*Testing asynchronous code is trickier , mocha's done() method makes it simpler  */
describe('COREAPI Testing', function (){
    describe('Testing User account operations addUser,check for valid Users,get USers and removing Users', function (){
        it('should return 1 if the user is added successfully', function(done) {

            core.addUser("users","karthic",function (err, result) {
                if(err)
                	return done(err);
                assert.equal(result, 1);
                done();
            });
        });
    


    
    it('should return 1 if the user is a valid User', function(done) {

            core.isUser("users","karthic",function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 1);
                done();
            });
     });
    

    
    it('Testing fetching all user names should return the users list if seccessful', function(done) {

            core.getUsers("users",function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result[0], "karthic");
                done();
            });
     });

    it('should return 1 if the user deletion is successful', function(done) {

            core.delUser("users","karthic",function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result,1);
                done();
            });
     });

 });   
    


    describe('Testing Adding User Info <username>:<email> ',function(){
        it('should return 1 if added User Info is added successfully ',function(done){
                core.addUserInfo("userInfo","karthic","kartronics85@gmail.com",function(err,result){
                if(err)
                    return done(err);
                assert.equal(result,1);
                done(); 
            });
        });
    });
    describe('Testing Fetching User MailId <username>:<email> ',function(){
        it('should return mailId if MailId is fetched  successfully ',function(done){
                core.getUserMail("userInfo","karthic",function(err,result){
                if(err)
                    return done(err);
                assert.equal(result,"kartronics85@gmail.com");
                done(); 
            });
        });
    });
    describe('Setting and incrementing the Redis String containing no.of.expenses and testing it and deleting the string with the last test i nthe group ', function (){
        it('should return 1 on setting and incrementing the string', function(done) {

            core.incr_no_of_expenses(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 1);
                done();
            });
        });
        it('should return 2 on  incrementing the string again', function(done) {

            core.incr_no_of_expenses(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 2);
                done();
            });
        });
        it('should return 2 on  reading the string again', function(done) {

            core.get_no_of_expenses(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 2);
                done();
            });
        });
        
        it('should return 1 on decrementing the string', function(done) {

            core.decr_no_of_expenses(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 1);
                done();
            });
        });
        it('should return 1 on deleting the string', function(done) {

            core.del_no_of_expenses(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 1);
                done();
            });
        });
    });

    describe('Setting and incrementing the Redis String containing no.of.users and testing it and deleting the string with the last test in the group ', function (){
        it('should return 1 on setting and incrementing the string', function(done) {

            core.incr_no_of_users(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 1);
                done();
            });
        });
        it('should return 2 on  incrementing the string again', function(done) {

            core.incr_no_of_users(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 2);
                done();
            });
        });
        it('should return 2 on  reading the string again', function(done) {

            core.get_no_of_users(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 2);
                done();
            });
        });
        it('should set the string to 3 ', function(done) {

            core.set_no_of_users(3,function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, "OK");
                done();
            });
        });
        it('should return 3 on  reading the string again', function(done) {

            core.get_no_of_users(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 3);
                done();
            });
        });
        
         it('should get the string with value 3 ', function(done) {

            core.get_no_of_users(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 3);
                done();
            });
        });
        
        it('should return 2 on decrementing the string', function(done) {

            core.decr_no_of_users(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 2);
                done();
            });
        });
        it('should return 1 on deleting the string', function(done) {

            core.del_no_of_users(function (err, result) {
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
                core.remExpense("expense_1","date",function(err,result){
                assert.equal(result,1);
                done(); 
            });
        });
    });



   describe('Testing Deleting User Info <username>:<email> ',function(){
        it('should return 1 if  User Info is deleted successfully ',function(done){
                core.delUserInfo("userInfo","karthic",function(err,result){
                assert.equal(result,1);
                done(); 
            });
        });
    });
});


