// module to manage the params

var fs = require('fs'),
	   utility = require('./utility'),
	   manager = require('./manager');
	   
var execute = function execute(argv) {
	delete argv.$0;
	delete argv.h;
	delete argv.help;
	delete argv.w;
	delete argv.wizard;
	delete argv.v;
	delete argv.version;
	delete argv.g;
	delete argv.config;

	for (var key in argv) {
		switch (key) {
			case "_" :		
				var moduleName = argv._[0];
				manager.moduleAnswer(cb, moduleName);
				break;
			case "t" : 
			case "template" : 
				var templateName = argv.t;
				manager.templateAnswer(cb, templateName);
				break;
			case "s" :
			case "script" : 
				var scriptChoice = argv.s;
				
				if (scriptChoice) {
					manager.scriptAnswer(cb, "Y");
				} else {
					manager.scriptAnswer(cb, "N");
				}
				break;
			case "c":
			case "controller" :	
				var controllerName = argv.c;
				manager.controllerAnswer(cb, controllerName);
				break;
			case "i" :
			case "interface" : 
				var interfaceName = argv.i;
				manager.interfaceAnswer(cb, interfaceName);
				break;
			case "r" :
			case "macro" :
				var macroName = argv.r;
				manager.macroAnswer(cb, macroName);
				break;
			case "x" :
			case "css" :
				var cssName = argv.x;
				manager.cssAnswer(cb, cssName);
				break;
			case "b" :
			case "hasBootstrap" :
				var bootstrapChoice = argv.b;
				
				if (bootstrapChoice) {
					manager.bootstrapAnswer(cb, "Y");
				} else {
					manager.bootstrapAnswer(cb, "N");
				}
				break;
			default :
				console.log('\n[Error] You are trying to use some params in the wrong way.'.err);
				console.log('[Info] Please check the help using -h or -help.'.info);				
				process.exit(0);
				break;
		}
	}
	manager.callGenerator();
};

function cb (value, answer) {
	switch(value) {
		case -1 : 
			process.exit(0);
			break;
		case 0 : 
			break;
		case 1 : 
			process.exit(0);
			break;
		case 2 : 
			process.exit(0);
			break;
		default :
			break;
	}
};

exports.execute = execute;