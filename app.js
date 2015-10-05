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
III.            NOW WE START DOING SOME WORK
-------------------------------------------------------*/

//------ DATABASE WORK
//Our app is going to connect to our mysql database using credentials set in .env file
//process.env object is created by the dotenv load line above
app.use(orm.express("mysql://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST, {
    define: function (db, models) {

      //Instructions for CREATING a table from scratch
      models.staff_db = db.define("staff_directory", {  // Create/define a TABLE called "staff_directory"
            id : {type: 'serial', key:true},            // Create a column called "id" that's a serial key. A serial key is simply a number that increments automatically.
            first_name: String,                         // Create a column called "first_name" that's text
            last_name: String,                          // Etc...
            department: String, 
            street: String, 
            city: String, 
            zip: String,
            lat: Number,                                // Create a column called "lat" that's a number
            lon: Number,
            business_phone: String,
            home_phone: String,
            mobile_phone: String,
            notes: String, 
        }, {
          methods : { 
            fullname: function() {     //Create a method that concatenates and returns a name and surname togther using "object.methodname()" format
              return this.first_name + ' ' + this.last_name;
            },
            buildPhoneNumber: function() { // checks to see if business_phone is a four-digit extension. if it is, adds in the preceding 6 digits
              if (this.business_phone.length = 4 ) {
                return "(214) 977-" + this.business_phone;
              }
            }
          }
        });
        
        //Sync the instructions with the database
        //NOTE: If database already exists, nothing happens.
        db.sync();

    }
}));

//------ SET ROUTE: A route takes info from the URL and turns it into variables used by the script
// It also intercepts client requests, ie, URL requests, and serves up the appropriate page based on the rules here

//From the root URL display the index.html template
app.get("/", function (req, res) {   
    res.render("index.html");
});

// From the /department/:variable URL display the department.html template
// In this case, the :department will be specified in the URL. Example: "localhost:3000/department/photo"
// where :department will equal "photo"
app.get("/department/:department", function (req, res) {
    
    //In the table "staff_db" we defined above find the department in the table column "department" and pass results back in array of "employees" ...
    req.models.staff_db.find({department:req.params.department}).run(function(err,employees){ 

        //Render a page using the department.html template and pass the department and the employees array
        res.render("department.html",{'employees' : employees,'department' :  req.params.department});
    });
});

// Another route, this time for the bio pages
// Like above, the :id will be specified in the URL. Example: "localhost:3000/bio/37"
// (NOTE: The id value is unique and lives in the table. We will set it on the department.html page)
app.get("/bio/:id", function (req, res) {

    //In the table "staff_db" we defined above find the id in the table column "id" and pass results back in array of "employee" ...
    req.models.staff_db.find({id:parseInt(req.params.id)}).run(function(err,employee){ 

        //Render a page using the bio.html template and pass the id and the employee array, which has only one item since each id is unique to an employee
        res.render("bio.html",{id:req.params.id,employee:employee[0]});

    });
});

// renders a page that has a field that user can input the extension of someone to get their full name and info

app.get("/reverse-lookup", function (req, res) {
    res.render("reverse-lookup.html");
});

// returns a page with the extension number, the name of the employee, and their department, other numbers and notes
app.get("/reverse-results/:extension", function (req, res) {

    req.models.staff_db.find({business_phone:req.params.extension}).run(function(err,employee) {
        res.render("reverse-results.html", {employee: employee[0]});
    });
});



/*-------------------------------------------------------
IV.          BUILD SERVER TO SERVE PAGES LOCALLY
-------------------------------------------------------*/

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});