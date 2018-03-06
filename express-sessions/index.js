//Variable Instantiations
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'SuperSecret'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6875);

//Utility Functions

//Server Functions
app.get('/count', function(req, res) {
    var context = {};
    context.count = req.session.count || 0;
    req.session.count = context.count + 1;
    res.render('counter', context);
});

app.get('/', function(req, res) {
    var context = {};
    //If there is no session, go to the main page
    if (!req.session.name) {
        res.render('newUser', context);
        return;
    }
    
    context.name = req.session.name;
    context.toDoCount = req.session.toDo.length || 0;
    context.toDo = req.session.toDo || [];
    console.log(context.toDo);
    res.render('toDo', context);
});

app.post('/',function(req,res){
    var context = {};

    if(req.body['New List']){
        req.session.name = req.body.name;
        req.session.toDo = [];
        req.session.curId = 0;
        renderPage();
    }

    //If there is no session, go to the main page.
    if(!req.session.name){
        res.render('newUser', context);
        return;
    }

    if(req.body['Add Item']){
        request('http://api.openweathermap.org/data/2.5/weather?zip=' + req.body.zip + ',us&units=imperial&APPID=' + 'ea86a4e01bf5414b259261012c1486c9', handleWeather);
    }

    function handleWeather(err, response, body) {
        var weather = JSON.parse(body);
        if (!err && response.statusCode < 400) {
            if (weather.main.temp >= req.body.temp) {
                
                req.session.toDo.push({ "name":req.body.name, "id":req.session.curId, 
                                        "zip":req.body.zip, "id":req.session.curId,
                                        "temp":req.body.temp, "id":req.session.curId,
                                        "statusColor":"green", "id":req.session.curId });
            } else {
                req.session.toDo.push({ "name":req.body.name, "id":req.session.curId, 
                                        "zip":req.body.zip, "id":req.session.curId,
                                        "temp":req.body.temp, "id":req.session.curId,
                                        "statusColor":"red", "id":req.session.curId });
            }
        } else {
            console.log(err);
            console.log(response.statusCode);
        }

        req.session.curId++;
        renderPage();
    }

    if(req.body['Done']){
        req.session.toDo = req.session.toDo.filter(function(e){
            return e.id != req.body.id;
        })
        renderPage();
    }

    function renderPage() {
        context.name = req.session.name;
        context.toDoCount = req.session.toDo.length;
        context.toDo = req.session.toDo;
        console.log(context.toDo);
        res.render('toDo',context);
    };
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