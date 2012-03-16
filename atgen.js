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
    .argv
;

// module to manage the wizard mode
var wizard = require("./lib/wizard"),
	   utility = require("./lib/utility"),
	   paramsMode = require("./lib/paramsMode"),
	   configHandler = require("./lib/configHandler");
	   
// show the help
if (argv.h) {
	require("optimist").showHelp();
	process.exit(0);
}

if (configHandler.checkConfigFile()) {
	runTool();
} else {
	configHandler.createConfigFile();
}

function runTool() {
	var argvSize = utility.size(argv);
	var noParams = (argv.s == false && argv.b == false && argv.m == null && argvSize == 10);
	
	// enter in wizard mode (typing at gen )
	if (noParams) {
		console.log('\n\n*** Welcome to the Aria Templates wizard ***'.msg);
		console.log('[Info] To skip a step press Enter'.info);
		console.log('[Info] To exit press ^C'.info);	
		wizard.start();
	} else {	// enter in the Command line mode
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
	}
};
