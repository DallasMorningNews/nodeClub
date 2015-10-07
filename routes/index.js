/*
Use the 'module.exports' syntax to export a function with the code you need.
You can pass whatever arguments you need to this function.
 */

module.exports = function(app){

	//Direct all URL requests to the appropriate routes.
	require('./home')(app);
	require('./bio')(app);
	require('./department')(app);
	require('./reverse-lookup')(app);

}