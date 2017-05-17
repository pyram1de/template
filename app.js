var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views','./src/views');

app.set('view engine', 'ejs');
app.get('/demo1', function(req, res){
    res.render('index', {
        place: 'world'
    });
});

app.get('/demo2', function(req, res){
    res.render('index2', {
        place: 'world'
    });
});

app.get('/demo3', function(req, res){
    res.render('index3', {
        place: 'world'
    });
});

app.listen(port, function(err){
    console.log('running server on port ' + port);
});