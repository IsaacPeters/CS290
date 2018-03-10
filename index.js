//Variable Instantiations
var express = require('express');

var path = require('path');
var app = express();

const mysql = require('./dbcon.js'); // note that this assumes your dbcon.js is in the same dir as your app.js

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6875);

//Utility Functions

//Server Functions
app.get('/test', function(req, res) {
    var context = {};
    mysql.pool.query("INSERT INTO todo (`name`) VALUES tester", function(err, result){
        context.results = "Inserted id " + result.insertId;
    });
    res.send(context);
    console.log("test");
});
       
app.get('/reset-table',function(req,res,next){
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
        var createString = "CREATE TABLE workouts("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "reps INT,"+
        "weight INT,"+
        "date DATE,"+
        "lbs BOOLEAN)";
        mysql.pool.query(createString, function(err){
            context.results = "Table reset";
            res.render('home',context);
        })
    });
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

//Start Server
app.listen(app.get('port'), function(){
    console.log('Express started on localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});