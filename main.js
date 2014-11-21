var _ = require('lodash');
var fs = require('fs');
var unpack = require('browser-unpack');
var intreq = require('intreq');
var pack = require('browser-pack');
var through = require('through');

var intreqFn = function(unpacked, callback){
	var r = intreq();
	var rows = [];
	r.on('data', function(row){
		rows.push(row);
	});
	r.on('end', function(){
		callback(rows);
	});
	_.each(unpacked, function(row){
		r.write(row);
	});
	r.end();
};

var minify_require_paths = function(orig, callback, packOptions){
	if (arguments.length === 0) {
		var code = '';
		return through(function(data){
			code += data;
		}, function(){
			var self = this;
			minify_require_paths(code, function(res){
				self.queue(res);
				self.queue(null);
			});
		});
	}
	var unpacked = unpack(orig.toString());
	intreqFn(unpacked, function(rows){
		var p = pack(packOptions);
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

var process_file = function(file, done, packOptions){
	fs.readFile(file, function(err, code){
		if(err) throw err;
		minify_require_paths(code, function(minied){
			fs.writeFile(file, minied, function(err){
				if(err) throw err;
				done();
			});
		}, packOptions);
	});
};

module.exports = minify_require_paths;
module.exports.process_file = process_file;
module.exports.cli = function(){
	var file = arguments[0];
	//TODO: accept console arguments for pack
	if(file){
		if(!fs.existsSync(file)){
			return console.error('File does not exist: %s', file);
		}
		process_file(file, _.noop);
	} else {
		process.stdin.pipe(minify_require_paths()).pipe(process.stdout);
	}
};

