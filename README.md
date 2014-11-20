What it does
------------
Turns your browserify output (i.e. bundle.js):
```javascript
var _         = require('lodash');
var robot     = require('./robot.js');
var something = require('../some/long/path');
```

Into this:
```javascript
var _         = require(1);
var robot     = require(2);
var something = require(3);
```

Which you can then throw into uglifyjs or some other minification script.
```javascript
var d=a(1),e=a(2),f=a(3)
```

`NOTE this is not a browserify transforms, it's a browserify tool`

#### Real-world example
998.51 kB =uglify=> **318.08 kB**

`vs`

998.51 kB =unpathify=> 903.50 kB =uglify=> **277.34 kB**

How to use it
-------------
There are 3 ways you can use this. (Note that both the Grunt and CLI methods simply  re-write the input file)

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

You can also pass options to `browser-pack` that is re-building your bundle.

```javascript
unpathify: {
    files: ["dist/awesome.js"],
    options: {
        packOptions: {
            standalone: "StandaloneName"
        }
    }
}
```

### Command Line
```sh
$ npm install -g unpathify
$ unpathify bundle.js
```

Piping is also supported:

```sh
$ browserify in.js | unpathify | uglifyjs -cm > out.js
```

### Node
```javascript
var unpathify = require('unpathify');
...
unpathify(code, function(code_unpathed){
   console.log(code_unpathed);
});
```

Streaming is also supported:

```javascript
var browserify = require('browserify');
var unpathify = require('unpathify');
...
var b = browserify();
b.add('./browser/main.js');
b.bundle().pipe(unpathify()).pipe(process.stdout);
```

License
-------
The MIT License (MIT)

Copyright (c) 2014 Small Helm LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
