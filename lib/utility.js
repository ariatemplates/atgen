// utility module

var path = require('path'), 
	   fs = require('fs'), 
	   util = require('util');

var checkDir = function checkDir (Path) {
	return path.existsSync(Path);
};

var checkFile = function checkFile (file, path) {
	try {
		var files = fs.readdirSync(path);
		if (files.indexOf(file) != -1) {
			return true;
		} else {
			return false;
		}
	} catch (ex) {
		return false;
	}
};

var loadFile = function loadFile (fullpath) {
	if (fullpath.search(/\\/) != -1) {
		var path = fullpath.slice(0, fullpath.lastIndexOf("\\") + 1);
	} else {
		var path = process.cwd();
	}
	var filename = fullpath.replace(/^.*[\\\/]/, '');
	
	console.log(filename);
	console.log(path);
	
	if (checkFile(filename, path)) {
		try {
			return fs.readFileSync(fullpath, 'utf-8');
		}
		catch (ex) {
			console.log("\n[Error] Could not open the file".err);
			process.exit(0);
		}
	} else {
		return null;
	}	
};

var isArray = function isArray (a) {
	if (a instanceof Array) {
		return true;
	} else {
		return false;
	}
};

var size = function size(json) {
	var count = 0;
	for (var key in json) {
		count++;
	}
	return count;
};

var checkClasspath = function checkClasspath (classpath) {
	for (i = 0; i < classpath.length; i++) {
		if (classpath[i].match(/^[a-z]+$/) == null) {
			return false;
		}
	}
	return true;
};

var checkFileName = function checkFileName (fileName) {
	if (fileName.match(/^[A-Z]{1,2}[a-z]{1}[a-z|A-Z|0-9]*$/) == null) {
		return false;
	}
	return true;
};

function checkChanges (json) {
	for (var prop in json) {
		if (json.hasOwnProperty(prop)) {
			if (prop != "root" && json[prop] != null) {
				return true;
			}
		}
	}
	return false;
};

var printOutput = function printOutput (changes) {
	var mod = checkChanges(changes);

	if (mod) {
		console.log("\n[Info] creating files and folders...\n".info);
		printStructure(changes);
	} else {
		console.log("\n[Warning] Nothing changed".warn);
	}
	console.log("\n[Info] Press ^C to EXIT".info);
};

function printStructure (changes) {
	console.log("\nroot: " + changes.root);
	console.log("\nstructure: ");
	if (changes.mode == "wizard") {
		console.log("        --- " + "doc".folder);
		console.log("        --- " + "model".folder);
	}	
	if (changes.macro != null) {
		console.log("        --- " + "lib".folder);
		console.log("             |");
		console.log("             --- " + changes.macro.file);
	}
	if ((changes.template != null) || (changes.script != null)) {
		console.log("        --- " + "view".folder);
		console.log("               |");
		if (changes.template != null) {
			console.log("               --- " + changes.template.file);
		}
		if (changes.script != null) {
			console.log("               --- " + changes.script.file);
		}
	}
	if (changes.style != null) {
		console.log("        --- " + "style".folder);
		console.log("                |");
		console.log("                --- " + changes.style.file);
	}
	if (changes.controller != null) {
		console.log("        --- " + changes.controller.file);		
	}
	if (changes.iface != null) {
		console.log("        --- " + changes.iface.file);
	}
	if (changes.bootstrap != null) {
		console.log("        --- " + changes.bootstrap.file);
	}
	if (changes.mode == "wizard") {
		console.log("        --- " + "README-AT.txt".file);
		console.log("\nPlease take a look af the README-AT.txt file".bar);
	}	
};

exports.checkDir = checkDir;
exports.checkFile = checkFile;
exports.loadFile = loadFile;
exports.checkClasspath = checkClasspath;
exports.checkFileName = checkFileName;
exports.printOutput = printOutput;
exports.size = size;
exports.isArray = isArray;