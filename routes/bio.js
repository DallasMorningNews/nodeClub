/*
Use the 'module.exports' syntax to export a function with the code you need.
You can pass whatever arguments you need to this function.
 */

module.exports = function(app){

	//------ SET ROUTE: A route takes info from the URL and turns it into variables used by the script
	// It also intercepts client requests, ie, URL requests, and serves up the appropriate page based on the rules here

	// The :id will be specified in the URL. Example: "localhost:3000/bio/37"
	// (NOTE: The id value is unique and lives in the table. We will set it on the department.html page)
	app.get("/bio/:id", function (req, res) {

	    //In the table "staff_db" we defined above find the id in the table column "id" and pass results back in array of "employee" ...
	    req.models.staff_db.find({id:parseInt(req.params.id)}).run(function(err,employee){ 

	        //Render a page using the bio.html template and pass the id and the employee array, which has only one item since each id is unique to an employee
	        res.render("bio.html",{id:req.params.id,employee:employee[0]});

	    });
	});
}