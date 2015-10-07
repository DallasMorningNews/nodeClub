/*
Use the 'module.exports' syntax to export a function with the code you need.
You can pass whatever arguments you need to this function.
 */

module.exports = function(app){

	//------ SET ROUTE: A route takes info from the URL and turns it into variables used by the script
	// It also intercepts client requests, ie, URL requests, and serves up the appropriate page based on the rules here

	//From the root URL display the index.html template
	app.get("/", function (req, res) {   
	    console.log(req.models.staff_db);
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
	        
	        //Throw 404 status and send basic response if no employee found
	        if(employee.length === 0){
	          res.status(404).send("No employee found");
	        }

	        res.render("reverse-results.html", {employee: employee[0]});
	    });
	});

}