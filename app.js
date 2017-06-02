var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views','./src/views');

app.set('view engine', 'ejs');
app.get('/', function(req, res){
    res.render('public');
});

app.get('/public', function(req, res){
    res.render('public');
});

app.get('/private', function(req, res){
    res.render('private');
});

app.listen(port, function(err){
    console.log('running server on port ' + port);
});