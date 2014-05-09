unpathify
=========
Compress browserify require paths for better minification i.e. require('some/long/path') => require(1)

How it Works
------------
Turns your browserify output (i.e. bundle.js)):
```javascript
...

var _         = require('lodash');
var robot     = require('./robot.js');
var something = require('../some/long/path');

...
```

Into This
```javascript
...

var _         = require(1);
var robot     = require(2);
var something = require(3);

...
```

Which you can then throw into uglifyjs or some other minification script.
```javascript
...
var d=a(1),e=a(2),f=a(3)
...
```


Installation
------------
There are 3 ways you can use this

### Grunt
```sh
$ npm install unpathify --save-dev
```
Gruntfile.js
```javascript
module.exports = function(grunt){
    grunt.initConfig({
        unpathify: {
            files: ['bundle.js']
        }
    });

    grunt.loadNpmTasks('unpathify');
};
```

### Command Line
```sh
$ npm install -g unpathify
$ unpathify bundle.js
```

### Plain old node
```javascript
var unpathify = require('unpathify');
unpathify('bundle.js', function(){
   console.log('All done!');
});
```

License
-------
MIT
