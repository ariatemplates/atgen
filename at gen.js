#!/usr/bin/env node
// module to run the tool-4-aria

// module to manage the command line arguments
var argv = require("optimist")
    .usage('Aria Templates wizard tool')
	.string("m").alias("m", "module").describe('m', "Project module name")
	.string("t").alias("t", "template").describe('t', "Create an html template")
	.boolean("s").alias("s", "script").describe('s', 'Add a template script')
	.string("w").alias("w", "wizard").describe('w', "Run the wizard with params")
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
	   paramsMode = require("./lib/paramsMode");
	   
// show the help
if (argv.h) {
	require("optimist").showHelp();
	process.exit(0);
}

var argvSize = utility.size(argv);
var noParams = (argv.s == false && argv.b == false && argv.m == null && argvSize == 8);
//var noParams = (argv.s == false && argv.b == false && argv.m == null && argv.h == false && argv.t == null && argv.l == null && argv.w == null && argv.c == null && argv.i == null && argv.r == null && argv.x == null);

// execute the wizard typing at gen
if (noParams) {
	console.log('\n\n***Welcome to the Aria Templates wizard***'.msg);
	console.log('[Info] To skip a step press Enter'.info);
	console.log('[Info] To exit press ^C'.info);
	
	wizard.start();
} else {
	if (argv.m == null || argv.m == true) {
		console.log('\n[Error] You have to provide the module name.'.err);
		console.log('[Info] Please check the help using -h or -help.'.info);
		process.exit(0);
	} else {
		paramsMode.execute(argv);
	}	
}
