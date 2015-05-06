'use strict';
var jinxCompiler = require('./');
var gulp = require('gulp');
var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var through = require('through2');


describe('gulp-jinx-compiler', function() {
	var mainFile = 'test/app/flash/test.jinx';
	var output = 'test/app/flash/dist';
	var outputFile = path.join(output,path.basename(mainFile,'.jinx')+".swf");

	it('should compile .jinx into .swf without parameters', function(done) {
		this.timeout(6000);

		return gulp.src(mainFile)
		.pipe(jinxCompiler(output))
		.pipe(through.obj(function (file, enc, callback) {
			expect(fs.readFileSync(outputFile)).to.be.an('object');
			fs.unlinkSync(outputFile);
			done();
		}));
	});

	it('should compile .jinx into .swf with parameters', function(done) {
		this.timeout(6000);

		return gulp.src(mainFile)
		.pipe(jinxCompiler(output,{
			'debug':true, // enable this for detailed errors
			'library-path':['test/app/flash/partials']
		}))
		.pipe(through.obj(function (file, enc, callback) {
			expect(fs.readFileSync(outputFile)).to.be.an('object');
			fs.unlinkSync(outputFile);
			done();
		}));
	});
});
