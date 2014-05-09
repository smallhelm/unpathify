var _ = require('lodash');
var unpathify = require('../main');

module.exports = function(grunt){
	grunt.registerMultiTask('unpathify', 'Compress browserify require paths for better minification', function(){
		var files = this.filesSrc;
		var done = _.after(files.length, this.async());
        var i;
        for(i = 0; i < files.length; i++){
			unpathify(files[i], done);
        }
	});
};
