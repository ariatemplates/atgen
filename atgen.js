#!/usr/bin/env node
// module to run the tool-4-aria

// module to manage the command line arguments
var argv = require("optimist")
    .usage('\n\nAria Templates wizard tool\n\nUsage: atgen [options]')
	.string("t").alias("t", "template").describe('t', "Create an html template")
	.boolean("s").alias("s", "script").describe('s', 'Add a template script')
	.boolean("w").alias("w", "wizard").describe('w', "Run the wizard with params")
	.string("c").alias("c", "controller").describe('c', "Create a controller")
	.string("i").alias("i", "interface").describe('i', "Create an interface for the controller created")
	.string("r").alias("r", "macro").describe('r', "Create a macro library file")
	.string("x").alias("x", "css").describe('x', "Create a css template")
	.boolean("b").alias("b", "hasBootstrap").describe('b', 'Create the bootstrap')
	.boolean("h").alias("h", "help").describe('h', 'Show the help guide')
	.boolean("v").alias("v", "version").describe('v', 'Show the version of the tool and the version of the framework in use')
	.boolean("g").alias("g", "config").describe('g', 'To edit the configuration file')
    .argv
;

var wizard = require("./lib/wizard"),							// module to manage the wizard mode
	   utility = require("./lib/utility"),								// module to use some utilities
	   paramsMode = require("./lib/paramsMode"),		// module to manage the command line mode
	   configHandler = require("./lib/configHandler");		// module to manage the configuration mode
	   
// to show the help
if (argv.h && argv.s == false && argv.b == false && argv.v == false && argv.g == false && utility.size(argv) == 14) {
	require("optimist").showHelp();
	process.exit(0);
}

// to show the tool version and the framework version
if (argv.v && argv.s == false && argv.b == false && argv.h == false && argv.g == false && utility.size(argv) == 14) {
	console.log("\n### atgen version 1.0 ###".file);
	console.log("framework version in use : " + configHandler.getFrameworkVersionNumber().warn + ".js".warn);
	process.exit(0);
}

if (configHandler.checkConfigFile()) {
	// configuration mode
	if (argv.g && argv.s == false && argv.b == false && argv.h == false && argv.v == false && utility.size(argv) == 14) {
		if (configHandler.checkConfigFile()) {
			configHandler.editConfigFile();
		} else {
			console.log("\n[Error] The configuration file doesn't exist.".err);	
			process.exit(0);
		}
	} else {
		runTool();
	}	
} else {
	configHandler.createConfigFile();
}

function runTool() {
	var argvSize = utility.size(argv);
	var noParams = (argv.s == false && argv.b == false && argv.v == false && argv.g == false && argv.h == false && argv.m == null && argvSize == 14);
	
	// enter in wizard mode (typing at gen)
	if (noParams) {
		console.log('\n\n*** Welcome to the Aria Templates wizard ***'.msg);
		console.log('[Info] To skip a step press Enter'.info);
		console.log('[Info] To exit press ^C'.info);	
		wizard.start();
	} else if (argv.g == false && argv.h == false && argv.v == false) {	// enter in the Command line mode
		if (argv._ == null || argv._ == "") {
			console.log('\n[Error] You have to provide the module name.'.err);
			console.log('[Info] Please check the help using -h or -help.'.info);
			process.exit(0);
		} else if (argv._.length > 1) {
			console.log('\n[Error] You can provide the module name only once.'.err);
			console.log('[Info] Please check the help using -h or -help.'.info);
			process.exit(0);
		} else if (argv.t instanceof Array || argv.c instanceof Array || argv.i instanceof Array || argv.r instanceof Array || argv.x instanceof Array) {
			console.log('\n[Error] Duplicate args not allowed.'.err);
			console.log('[Info] Please check the help using -h or -help.'.info);
			process.exit(0);
		} else if (argv.t == true || argv.c == true || argv.i == true || argv.r == true || argv.x == true) {
			console.log('\n[Error] You can\'t use a string argument without specify any content.'.err);
			console.log('[Info] Please check the help using -h or -help.'.info);
			process.exit(0);
		} else {
			paramsMode.execute(argv);
		}	
	} else {
		console.log('\n[Error] Incompatible params.'.err);
		console.log('[Info] Please check the help using -h or -help.'.info);
		process.exit(0);
	}
};
