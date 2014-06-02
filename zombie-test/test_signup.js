var assert = require('assert'),
	virtualBrowser = require('zombie'),
	app = require('../app.js');

	/*before(function(done){
		app.start(3000,done);
	});*/

	/*after(function(done){
		app.server.close(done);
	});*/

	describe('Signup Test',function(){
		describe('sign up form test',function(){
			it('This should load the sign up form',function(done){
				
				virtualBrowser.visit('http://127.0.0.1:3000/modal',function(err,browser){
					if(err)
						throw err;
					console.log('Zombie visited the page,page loaded ');	
					assert.ok(browser.success,'page loaded');

					done();
				});
			});

		});
	});