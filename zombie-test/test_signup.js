var assert = require('assert'),
	virtualBrowser = require('zombie'),
	app = require('../app.js');

	/*before(function(done){
		app.start(3000,done);
	});*/

	/*after(function(done){
		app.server.close(done);
	});*/

	describe('Login tests',function(){
		describe('Using username and password to login and test',function(){
			it('Checking for the right page',function(done){
				
				virtualBrowser.visit('http://127.0.0.1:3000/modal',function(err,browser){
					if(err)
						throw err;
					console.log('Z.Zombie visited the page,page loaded	 ');	
					assert.ok(browser.success,'page loaded');
					assert.equal(browser.text('h4'),'Welcome Roomie');
					var form = browser.query('form');
					assert(form,'form present on the page');
					assert.equal(form.method,'post','POSTing present on the page');
					assert.equal(form.action,'/modal','Post to modal exists');
					done();
				});
			});
			it('Testing for the reply for wrong username ',function(done){
				virtualBrowser.visit('http://127.0.0.1:3000/modal',function(err,browser){
					browser
						.fill('#roomiename','ab')
						.fill('#email','kartronics85@yahoo.com')
						assert.equal(browser.text('.error'),'Too short a name to be a roomie!')
						done();
				});
			});
			it('Testing for the reply for invalid email format ',function(done){
				virtualBrowser.visit('http://127.0.0.1:3000/modal',function(err,browser){
					browser
						.fill('#roomiename','abcde')
						.fill('#email','kartronics85yahoo.com')
						assert.equal(browser.text('.error'),'LOL.I know this aint a valid address format!:D');
						done();
				});
			});
			it('Logging in and testing it ',function(done){
				virtualBrowser.visit('http://127.0.0.1:3000/modal',function(err,browser){
					browser
						.fill('#roomiename','rao')
						.fill('#email','kartronics85@yahoo.com')
						.pressButton('#save',function(err){
							if(err)
								throw err;
							console.log('Z.Login test successful');
							assert.equal(browser.text('h3'),'An Expense Manager application built with Socket.IO,Twitter Bootstrap, Node.js, Express,Redis and tested using mocha');
							done();
						});
				});
			});

		});
	});