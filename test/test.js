var assert = require("assert");
var core=require("../CORE-API/coreOps.js");

describe('COREAPI', function (){
    describe('addUser', function (){
        it('should return 1 if the user is added successfully', function(done) {

            core.addUser(function (err, result) {
                if(err)
                	return done(err);
                assert.equal(result, 1);
                done();
            });
        });
    });
  describe('remUser', function (){
        it('should return 1 if the user is removed successfully', function(done) {

            core.remUser(function (err, result) {
                if(err)
                	return done(err);
                assert.equal(result, 1);
                done();
            });
        });
    });
});
