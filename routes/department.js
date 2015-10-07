/*
Use the 'module.exports' syntax to export a function with the code you need.
You can pass whatever arguments you need to this function.
 */

module.exports = function(app){

	//------ SET ROUTE: A route takes info from the URL and turns it into variables used by the script
	// It also intercepts client requests, ie, URL requests, and serves up the appropriate page based on the rules here

	// The :department will be specified in the URL. Example: "localhost:3000/department/photo"
	// where :department will equal "photo"
	app.get("/department/:department", function (req, res) {
	    
	    //In the table "staff_db" we defined above find the department in the table column "department" and pass results back in array of "employees" ...
	    req.models.staff_db.find({department:req.params.department}).run(function(err,employees){ 

	        //Render a page using the department.html template and pass the department and the employees array
	        res.render("department.html",{'employees' : employees,'department' :  req.params.department});
	    });
	});
}