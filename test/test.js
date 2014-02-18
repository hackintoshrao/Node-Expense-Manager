var assert = require("assert");
var core = require('../COREAPI/coreOps.js');
describe('COREAPI', function(){
  describe('addUser', function(){
    it('should return 0 if the user is added successfully', function(){
      assert.equal(0,core.addUSer("Karthic") );
      
    })
  })
})