DEPRECATED in favor of [bundle-collapser](https://www.npmjs.org/package/bundle-collapser)

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

Migrating to bundle-collapser from unpathify 
--------------------------------------------

```sh
$ npm install bundle-collapser --save-dev
```

### grunt
Gruntfile.js
```js
var collapse = require('bundle-collapser/plugin');
module.exports = function(grunt){
  grunt.initConfig({
    browserify: {
      dev: {
        files: {'bundle.js': ['main.js']},
        options: {
          plugin: [collapse]
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-browserify');
};
```

### gulp
gulpfile.js
```js
var collapse = require('bundle-collapser/plugin');
gulp.task('default', function() {
  return browserify('./main.js')
    .plugin(collapse)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('scripts'));
});
```


### Command Line
```sh
$ sudo npm install -g bundle-collapser
$ bundle-collapser bundle.js bundle.js
```
Piping
```sh
$ browserify main.js | bundle-collapser | uglifyjs -cm > bundle.js
```

### Node
See [this](http://github.com/substack/bundle-collapser#api)

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
