/*-------------------------------------------------------
I.      IMPORTANT FILES/FOLDERS IN THE DIRECTORIES
---------------------------------------------------------
FILES
package.json - the shopping list of all our dependencies and meta info about the app
.env -- environment file where we can save private database credentials as "environment variables"
app.js -- main script the server runs
nodemon.json -- nodemon config file. Basically tells it what folders to watch for changes and restart the app.

FOLDERS
node_modules -- Directory that holds actual dependencies listed in package.json
static -- Directory that will hold all of our static files like images, CSS and client-side javascript
models -- Directory where we'll declare our "models", i.e., the structure of our database tables
templates -- Directory for holding templates for site pages



/*-------------------------------------------------------
 II.              INITIALIZATION FURNITURE
-------------------------------------------------------*/

//Require listed dependencies
var express = require('express'),
  nunjucks = require('nunjucks'),
  orm = require('orm');

//In conjunction with dotenv dependency, allows access to environment variables in .env file
require('dotenv').load();

//Declare our app as an Express app
var app = express();

//Declare Nunjucks and set some initial options
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

//Tell script that we will be serving CSS, Javascripts and Images through this directory
app.use(express.static('static'));


/*-------------------------------------------------------
III.            ROUTES
-------------------------------------------------------*/

//Load our routes from a routes file.
//We can 'require' files just like we would other node modules. 
//Notice the '.js' is optional on 'routes.js'
require('./routes/routes')(app);


/*-------------------------------------------------------
IV.            DATABASE
-------------------------------------------------------*/

//Our app is going to connect to our mysql database using credentials set in .env file
//process.env object is created by the dotenv load line above
app.use(orm.express("mysql://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST, {
    
    /*
    We're going to use db.load to get our model definitions from another
    file, much like we did using 'require' for our routes.

    The slight difference is that db.load is an async function, so we need 
    to pass the 'next' argument to our define function. This gives us some
    blocking that waits for the models to load.
     */

    define: function (db, models, next) {
        // db.load pulls in model definitions from our models def file
        db.load("./models/staff",function(err){
          models.staff_db = db.models.staff_directory;
        });

        db.sync();
        //next function is run after the models load, allowing the
        //app to finish initializing.
        next();
    }
}));


/*-------------------------------------------------------
V.          BUILD SERVER TO SERVE PAGES LOCALLY
-------------------------------------------------------*/

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});