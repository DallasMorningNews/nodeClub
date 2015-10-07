
// All external files use the 'module.exports' syntax
// to export the function to the app.
module.exports = function(db, cb){


    db.define("staff_directory", {  // Create/define a TABLE called "staff_directory"
	            
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
	              if (this.business_phone.length === 4 ) {
	                return "(214) 977-" + this.business_phone;
	              }
	            }
	          }

        });


	return cb();

}