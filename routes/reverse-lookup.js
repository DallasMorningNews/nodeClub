/*
Use the 'module.exports' syntax to export a function with the code you need.
You can pass whatever arguments you need to this function.
 */

module.exports = function(app){

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