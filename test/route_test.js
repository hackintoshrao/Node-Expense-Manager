var assert = require("assert");
var core=require("../CORE-API/coreOps.js");
var expense = require("../routes/expenses.js");

describe("Testing the List expense API under /expense,Testing /expense by incrementing no of expenses and setting expense_1 and reading no.of.expense and expense_1 and later deleting them",function(){
	describe("Increment the counter and add Expense",function(){
		 it('should return 1 on setting and incrementing the string', function(done) {

            core.incr_no_of_expenses(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 1);
                done();
            });
		})
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
	})
	
	describe("Testing the Expenses API after inserting data",function(){
		it("should have right key value pairs after inserting ",function(done){
			expense.populateExpenses(function(err,result){
				assert(result[0].amount,100);
				assert(result[0].description,"Breakfast");
				assert(result[0].paidBy,"karthic");
				done();
			});
		});
	});

	describe("tesing deleting the string and then the expense",function(){
		it('should return 1 on deleting the string', function(done) {

            core.del_no_of_expenses(function (err, result) {
                if(err)
                    return done(err);
                assert.equal(result, 1);
                done();
            });
        });
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
})
