var _ = require('lodash');
var process_file = require('../main').process_file;

module.exports = function(grunt){
	grunt.registerMultiTask('unpathify', 'Compress browserify require paths for better minification', function(){
		var files = this.filesSrc;
		var options = this.options({});
		var done = _.after(files.length, this.async());
		var i;
		for(i = 0; i < files.length; i++){
			process_file(files[i], done, options.packOptions);
		}
	});
};
