/*-------------------------------------------------------
I.      IMPORTANT FILES/FOLDERS IN THE DIRECTORIES
---------------------------------------------------------
FILES
package.json - the shopping list of all our dependencies
.env -- environment file where we can save private database credentials
app.js -- main script the server runs
nodemon.json -- give nodemon instructions, in this case script as well as static files

FOLDERS
node_modules -- Directory that holds actual dependencies listed in package.json
static -- Directory that will hold all of our static files like images, CSS and client-side javascript
models -- Directory where we'll hold our database/table code
templates -- Directory for holding templates for site pages



/*-------------------------------------------------------
 II.              INITIALIZATION FURNITURE
-------------------------------------------------------*/

//Require listed dependencies
var express = require('express'),
	nunjucks = require('nunjucks'),
	orm = require('orm');

//In conjunction with dotenv dependency, allows access to data in .env file
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
III.            NOW WE START DOING SOME WORK
-------------------------------------------------------*/

//------ DATABASE WORK
//Our app is going to connect to our mysql database using credentials set in .env file
app.use(orm.express("mysql://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST, {
    define: function (db, models) {

    	//Instructions for CREATING a table from scratch
        models.person = db.define("person", {   // Create/define a TABLE called "person"
        	id : {type: 'serial', key:true},    // Create a column called "id" that's a serial key. A serial key is simply a number that increments automatically.
        	name: {type: 'text'},               // Create a column called "name" that's text
        	surname: {type: 'text'}             // Create a column called "surname" that's text
        }, {
        	methods : {    //Create a method that concatenates and returns a name and surname togther using "object.methodname()" format
        		fullname: function() {
        			return this.name + ' ' + this.surname;
        		}
        	}
        });

        //Sync the instructions with the database
        //NOTE: If database already exists, nothing happens.
        db.sync();
    }
}));

//------ SET ROUTE: A route takes info from the URL and turns it into variables used by the script
app.get('/home/:name', function (req, res) {     //When the URL has "/home/Layne" do the following...
    
    //In the table called "person," find the var "Layne" in the column "name" and pass results back in "people" object...
	req.models.person.find({name:req.params.name}).run(function(err,people){    
		
        //Render a page using the home template and pass the result of the "fullname()" method located in the models object above. 
        res.render("home.html",{'name' : people[0].fullname() });               
	});
});


/*-------------------------------------------------------
IV.          BUILD SERVER TO SERVE PAGES
-------------------------------------------------------*/

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});