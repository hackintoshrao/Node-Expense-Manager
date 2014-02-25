
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , io_init = require('socket.io')
  , expenses = require('./routes/expenses.js')
  , modal = require('./routes/modal')
  , chatroom = require('./routes/chatroom')
  , settle_route = require('./routes/settlement.js')
  , info = require('./routes/about')
  , initial_dump = require('./routes/initial_db_user_info_dump');
  

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.session({secret:"asdrfsjfsdjfssdfsdf"}));
  app.use(function(req,res,next){
      next();
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

initial_dump.initialize();

app.get('/expenses',function(req,res){
 
    expenses.populateExpenses(function(err,reply,no_of_expenses){
    console.log("total:"+ no_of_expenses);
    res.render('populateExpenses',{info:reply});
   
    });

});
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/modal',modal.showModal);
app.post('/modal',modal.getModalData);
app.get('/roomies',chatroom.renderroom);
    


app.get('/settlement',settle_route.settleExpense);
app.get('/about',info.about);


var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
chatroom.initialize(server);




