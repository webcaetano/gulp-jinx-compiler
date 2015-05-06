[![Build Status](https://travis-ci.org/webcaetano/gulp-jinx-compiler.svg?branch=master)](https://travis-ci.org/webcaetano/gulp-jinx-compiler) [![npm version](https://badge.fury.io/js/gulp-jinx-compiler.svg)](http://badge.fury.io/js/gulp-jinx-compiler)

# Gulp Flash

### Installation

```
npm install gulp-jinx-compiler
```

### Documentation


Without parameters

```javascript
var jinxCompiler = require('gulp-jinx-compiler');

gulp.src('test/app/flash/test.jinx')
.pipe(jinxCompiler('test/app/flash/dist'))
// will compile jinx into swf
```

With parameters

```javascript
gulp.src('test/app/flash/test.jinx')
.pipe(jinxCompiler('test/app/flash/dist',{
	'debug':true,
	'library-path': [
		'./libs'
	],
	'source-path': [
		'./zClass'
	],
	'swf-version': 13,
	'use-gpu': true
})); // will compile jinx into swf
```

---------------------------------

The MIT [License](https://raw.githubusercontent.com/webcaetano/gulp-flash/master/LICENSE.md)
