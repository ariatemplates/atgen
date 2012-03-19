// module to manage the configuration for the aria templates version for the tool

var nconf = require('nconf'), utility = require("./utility"), readlineInterface = require('./readlineInterface'), fs = require('fs'), rl = readlineInterface.rl, frameworkpath = "";

var createConfigFile = function createConfigFile () {	
	rl.question("Please type the Aria Templates framework complete path (C:\\your path\\aria\\): ", frameworkPathAnswer.bind(this, cb));	
};

var editConfigFile = function editConfigFile () {
	console.log("\n\nFramework version in use: " + getFrameworkVersionNumber().file + ".js".file);
	//rl.question("Type a new framework script name to update the configuration: ", editAnswer);	
	createConfigFile();
};

function editAnswer (answer) {
	switch (answer) {
		case "" : 
			console.log("[Info] Exit without any changes".info);
			process.exit(0);
			break;
		default : 
			writeConfigFile(getFrameworkPath() + "aria\\" + answer);
			break;
	}
};

function frameworkPathAnswer (cb, answer) {
	if (utility.checkDir(answer)) {		
		try {
			var files = fs.readdirSync(answer);
			var fwkscript = [];
			
			// adding the \ at the end of the path provided from the user
			if (answer.charAt(answer.length - 1) != "\\") {
				answer = answer + "\\";
			}
			frameworkpath = answer;
			for (var i = 0; i < files.length; i++) {
				if (files[i].match(/^aria-templates-/g)) {
					fwkscript.push(files[i]);
				}					
			}
			
			if (fwkscript.length == 0) {
				console.log("[Error] There are not Aria Templates framework scripts in this folder.".err);
				process.exit(0);
			} else if (fwkscript.length == 1) {
				if (checkVersionNumber(fwkscript[0])) {
					writeConfigFile (answer + fwkscript[0]);
				} else {
					console.log("[Warning] You have to chose Aria Templates version 27 or higher.".warn);
					cb.call(this, 0);
				}
				
			} else if (fwkscript.length >=2) {
				console.log("\nAria Templates framework scripts found: \n");
				for (var i = 0; i < fwkscript.length; i++) {
					if (checkVersionNumber(fwkscript[i])) {
						console.log(fwkscript[i].file);
					}
				}
				cb.call(this, 1);
			}
		} catch (ex) {
			console.error(ex.message);
		}	
	} else {
		console.log("[Error] This path does not exist.".err);
		process.exit(0);
	}
};

function checkVersionNumber (script) {
	var number = script.split("aria-templates-")[1];
	var first = + number.split(".")[0];
	var second = + number.split(".")[1].split("-")[0];
	var third = number.split(".")[1].split("-")[1];
	
	if (first >= 1 && second >= 1) {
		if (third == 'SNAPSHOT') {
			return true;
		} else {
			third = + third;
			if (third >= 27) {
				return true;
			} else {
				return false;
			}
		}
	} else {
		return false;
	}
};

var getFrameworkVersionNumber = function getFrameworkVersionNumber () {
	try {
		nconf.use('file', { file: __dirname + "/../config.json"});
		nconf.load();
		var s = nconf.get('frameworkscript').split("\\");
		var script = s[s.length - 1];
		var number = script.split("aria-templates-")[1];
		var first = + number.split(".")[0];
		var second = + number.split(".")[1].split("-")[0];
		var third = number.split(".")[1].split("-")[1];
		
		if (first >= 1 && second >= 1) {
			if (third == 'SNAPSHOT') {
				return "aria-templates-" + first + "." + second + "-" + third;
			} else {
				third = + third;
				if (third >= 27) {
					return "aria-templates-" + first + "." + second + "-" + third;
				} else {
					return false;
				}
			}
		} else {
			return false;
		}
	}
	catch (ex) {
		console.log('\n[Error] Impossible to read the configuration file.'.err + "\n[Info] Please check your config.json file.".info);
		process.exit(0);
	}	
};

function frameworkVersionAnswer (cb, answer) {	
	if (utility.checkFile(answer, frameworkpath)) {
		writeConfigFile (frameworkpath + answer);
	} else {
		console.log("[Error] The file is wrong.".err);
		cb.call(this, 1);
	}
};

function cb (value, answer) {
	switch(value) {
		case 0 : 
			createConfigFile();
			break;
		case 1 : 
			rl.question("Which version do you want to use? : ", frameworkVersionAnswer.bind(this, cb));
			break;
		default :
			break;
	}
};

function writeConfigFile (fwkfile) {
	nconf.use('file', { file: __dirname + "/../config.json"});
	nconf.load();
	nconf.set('frameworkscript', fwkfile);
	nconf.save(function (err) {
		if (err) {
			console.error(err.message);
			return;
		}
		console.log('Configuration of Aria Templates saved successfully.'.file);
		process.exit(0);
	});
};

var checkConfigFile = function checkConfigFile (){
	var path = __dirname + "/../";
	return utility.checkFile('config.json', path);
};

var getFrameworkPath = function getFrameworkPath () {
	try {
		nconf.use('file', { file: __dirname + "/../config.json"});
		nconf.load();
		var fwkscript = nconf.get('frameworkscript');
		var splitted = fwkscript.split("\\");
		var fwkpath = "";
		
		for (i = 0; i < splitted.length - 2; i++) {
			fwkpath = fwkpath + splitted[i] + "\\";
		}
		return fwkpath;
	}
	catch (ex) {
		console.log('\n[Error] Impossible to load the framework script path.'.err + "\n[Info] Please check your config.json file.".info);
		process.exit(0);
	}
};

var getFrameworkScript = function getFrameworkScript () {
	try {
		nconf.use('file', { file: __dirname + "/../config.json"});
		nconf.load();
		return nconf.get('frameworkscript');
	}
	catch (ex) {
		console.log('\n[Error] Impossible to load the framework script path.'.err + "\n[Info] Please check your config.json file.".info);
		process.exit(0);
	}	
};

var getFrameworkVersion = function getFrameworkVersion () {
	try {
		nconf.use('file', { file: __dirname + "/../config.json"});
		nconf.load();
		var fwkscript = nconf.get('frameworkscript');
		var splitted = fwkscript.split("aria-templates-");
		
		return splitted[splitted.length - 1];
	}
	catch (ex) {
		console.log('\n[Error] Impossible to load the framework script path.'.err + "\n[Info] Please check your config.json file.".info);
		process.exit(0);
	}	
};

exports.createConfigFile = createConfigFile;
exports.editConfigFile = editConfigFile;
exports.checkConfigFile = checkConfigFile;
exports.getFrameworkPath = getFrameworkPath;
exports.getFrameworkScript = getFrameworkScript;
exports.getFrameworkVersion = getFrameworkVersion;
exports.getFrameworkVersionNumber = getFrameworkVersionNumber;