// utility module

var path = require('path'), 
	   fs = require('fs');

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
	process.exit(0);
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
exports.checkClasspath = checkClasspath;
exports.checkFileName = checkFileName;
exports.printOutput = printOutput;
exports.size = size;
exports.isArray = isArray;