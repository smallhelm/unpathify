var _ = require('lodash');
var unpack = require('browser-unpack');
var intreq = require('intreq');
var pack = require('browser-pack');

var intreqFn = function(unpacked, callback){
	var r = intreq();
	var rows = [];
	r.on('data', function(row){
		rows.push(row);
	});
	r.on('end', function(){
		callback(rows);
	});
	unpacked.forEach(function(row){
		r.write(row);
	});
	r.end();
};

var minify_require_paths = function(orig, callback){
	var unpacked = unpack(orig.toString());
	intreqFn(unpacked, function(rows){
		var p = pack();
		var data = '';
		p.on('data', function(buf){
			data += buf;
		});
		p.on('end', function(){
			callback(data);
		});
		p.end(JSON.stringify(rows));
	});
};

var process_file = function(file, done){
	var code = fs.readFileSync(file);
	minify_require_paths(code, function(minied){
		fs.writeFileSync(file, minied);
		done();
	});
};

module.exports = function(grunt){
	grunt.registerMultiTask('unpathify', 'Compress browserify require paths for better minification', function(){
		var files = this.filesSrc;
		var done = _.after(files.length, this.async());
        var i;
        for(i = 0; i < files.length; i++){
			process_file(files[i], done);
        }
	});
};
