/*
Use the 'module.exports' syntax to export a function with the code you need.
You can pass whatever arguments you need to this function.
 */

module.exports = function(app){

	//------ SET ROUTE: A route takes info from the URL and turns it into variables used by the script
	// It also intercepts client requests, ie, URL requests, and serves up the appropriate page based on the rules here

	//Render a page using the index.html template.
	app.get("/", function (req, res) {   
	    res.render("index.html");
	});
}