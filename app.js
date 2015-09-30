var express = require('express'),
	nunjucks = require('nunjucks'),
	orm = require('orm');

require('dotenv').load();

var app = express();

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});


app.use(express.static('static'))

app.get('/home/:name', function (req, res) {

      res.render("home.html",{'name' : req.params.name })
  
  });

});





var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});