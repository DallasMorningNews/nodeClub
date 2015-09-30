/*---------------------------------------------------------------------------
			    GET OUR DEPENDENCIES DECLARED AND PRIMED
---------------------------------------------------------------------------*/
//Tell our app which dependencies are required.
var express = require('express'),
	nunjucks = require('nunjucks'),
	orm = require('orm');

//require the use of our .env file which containes the database credentials.
require('dotenv').load();

//Tell our app to use express
var app = express();

//Configure Nunjucks, our templating library
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

//We're going to use express but keep some assets in the static directory?
app.use(express.static('static'));



/*---------------------------------------------------------------------------
			      THIS IS WHERE WE ACTUALLY BANG ON CODE
---------------------------------------------------------------------------*/

//This sets up a route.
//A route takes parts of the URL and uses them for variables.
//localhost:3000/home/troy === req.params.name which comes from the ":name" in the get string
app.get('/home/:name', function (req, res) {
	//Render the page home in the home.html file using the name varivable from the url
    res.render("home.html",{'name' : req.params.name })
  });
});


/*---------------------------------------------------------------------------
			      FURNITURE WITH WEB SERVER INSTRUCTIONS
---------------------------------------------------------------------------*/
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});