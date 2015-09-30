module.exports = function (db, cb) {

	
    db.define("person", { 
      	id : {type: 'serial', key:true},
      	name:    {type: 'text'},
			surname: {type: 'text'}
      }, {
      methods : {
        fullName: function() {
          return this.name + ' ' + this.surname;
        }
      }
    });

    return cb();
};