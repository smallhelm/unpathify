var _ = require('lodash');
var fs = require('fs');
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

module.exports = process_file;
module.exports.cli = function(){
	var file = arguments[0];
	if(!fs.existsSync(file)){
		console.log('USAGE: unpathify <input>')
	}
	process_file(file, _.noop);
};

