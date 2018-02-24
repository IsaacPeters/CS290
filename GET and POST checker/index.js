var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 1845);

//GET request function
function getRoute(req, res) {
    var parameters = [];
    for (var p in req.query) {
        parameters.push({'name':p,'value':req.query[p]});
    }
    var context = {};
    context.dataList = parameters;
    res.render('get-loopback', context);
}

//POST request function
function postRoute(req, res) {
    var parameters = [];
    for (var p in req.body) {
        parameters.push({'name':p,'value':req.body[p]});
    }

    var context = {};
    context.dataList = parameters;
    res.render('post-loopback', context);
}

app.get('/', getRoute);
app.post('/',postRoute);

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

app.listen(app.get('port'), function(){
    console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});