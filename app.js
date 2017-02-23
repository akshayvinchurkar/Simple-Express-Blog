var express = require('express');
var app = express();

var hbs = require('hbs');

var blogEngine = require('./blog');

app.use(express.static('public'));
 
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());


//this is all routs who give the path to the all events happening on page 
app.get('/', function(req, res) {
    res.render('index',{title:"My Blog", entries:blogEngine.getBlogEntries()});
});
 
app.get('/about', function(req, res) {
    res.render('about', {title:"About Me"});
});

//this is special one because it takes argument of "Id" 
app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});
 
app.listen(3000);