'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var swfBuild = require('swf-build');
var beep = require('beepbeep');
var _ = require('lodash');
var jinxCompiler = require('jinx-compiler')


module.exports = function (output,params,options) {
	if (!output) throw new gutil.PluginError('gulp-jinx-compiler', '`output` required');

	var defaults = {
		tmp:'.tmp'
	}

	var paramsDefault = {
		'debug':true,
		'library-path':[]
	}

	params = _.extend({},paramsDefault,params);
	options = _.extend({},defaults,options);

	return through.obj(function (file, enc, callback) {
		var destAs = path.join(
			path.join(options.tmp,'jinx'), // tmp dir
			path.dirname(path.relative('./',file.path)), //file dir
			path.basename(file.path,'.jinx')+'.as' // file name
		);

		params['library-path'].push(path.dirname(destAs));

		var resp = jinxCompiler(file,destAs);

		file.contents = resp.contents;

		mkdirp.sync(path.dirname(destAs));
		fs.writeFileSync(destAs,resp.contents);
		file.path = destAs;

		if(resp.swc && Array.isArray(resp.swc) && resp.swc.length){
			for(var i in resp.swc) path.relative(resp.swc[i],destAs);
		}

		params['library-path'] = _.uniq(params['library-path'].concat(resp.swc));

		var args = [file.path]; // input

		if(typeof output==='string') { // if string are output path
			args.push((!path.extname(path.resolve(output)) ? path.resolve(output,path.basename(file.path,'.as')+'.swf') : path.resolve(output)));
		}

		if(typeof output==='object') { //params
			args.push(output);
		} else {
			if(params) args.push(params);
		}

		args.push(function(err, stdout, stderr){ // callback
			if(err) {
				beep();
				console.log(err);
			}
			callback(null, file);
		});

		swfBuild.bind.apply(swfBuild, [null].concat(args))();
	});
};
