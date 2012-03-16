// module to manage the configuration for the aria templates version for the tool

var nconf = require('nconf'), utility = require("./utility"), readlineInterface = require('./readlineInterface'), fs = require('fs'), rl = readlineInterface.rl;

var createConfigFile = function createConfigFile () {	
	rl.question("\nPlease type the Aria Templates framework complete path (C:\\..\\aria\\): ", frameworkPathAnswer.bind(this, cb));	
};

function frameworkPathAnswer (cb, answer) {
	var fwkpath = "";
	
	if (utility.checkDir(answer)) {
			try {
				var files = fs.readdirSync(answer);
				var fwkscript = [];
				
				if (answer.charAt(answer.length - 1) != "\\") {
					answer = answer + "\\";
				}
				
				for (var i = 0; i < files.length; i++) {
					if (files[i].match(/aria-templates-/g)) {
						fwkscript.push(files[i]);
					}					
				}
				
				if (fwkscript.length == 0) {
					// non ci sono fwk script
					console.log("There are not Aria Templates framework scripts in this folder.".err);
					process.exit(0);
				} else if (fwkscript.length == 1) {
					// controlla che sia una versione superiore alla 26
					writeConfigFile (answer + fwkscript[0]);
				} else if (fwkscript.length >=2) {
					// chiedo quale file vuole usare e controllo che sia una versione superiore alla 26		
					cb.call(this, 1);
				}
			} catch (ex) {
				console.error(ex.message);
			}	
				
				
		} else {
			// il path non esiste
			console.log("This path does not exist.".err);
			process.exit(0);
		}
};

function frameworkVersionAnswer (cb, answer) {
	var version = "";
	
	if (utility.checkFile(version, answer)) {
		writeConfigFile (answer + version);
	} else {
		console.log("[Error] The file is wrong.".err);
		cb.call(this, 1);
	}
};

function cb (value, answer) {
	switch(value) {
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
		console.log('Configuration of Aria Templates framework path save successfully.'.file);
		process.exit(0);
	});
};

var checkConfigFile = function checkConfigFile (){
	var path = __dirname + "/../";
	return utility.checkFile('config.json', path);
};

var getFrameworkPath = function getFrameworkPath () {
	nconf.use('file', { file: __dirname + "/../config.json"});
	nconf.load();
	var fwkscript = nconf.get('frameworkscript');
	var splitted = fwkscript.split("\\");
	var fwkpath = "";
	
	for (i = 0; i < splitted.length - 2; i++) {
		fwkpath = fwkpath + splitted[i] + "\\";
	}
	return fwkpath;
};

var getFrameworkScript = function getFrameworkScript () {
	nconf.use('file', { file: __dirname + "/../config.json"});
	nconf.load();
	return nconf.get('frameworkscript');
};

exports.createConfigFile = createConfigFile;
exports.checkConfigFile = checkConfigFile;
exports.getFrameworkPath = getFrameworkPath;
exports.getFrameworkScript = getFrameworkScript;