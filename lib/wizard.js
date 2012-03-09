// wizard

// module to manage the user's inputs
var readline = require('readline'), colors = require('colors'), // npm install colors
rl = readline.createInterface(process.stdin, process.stdout), prefix = "at gen>", prefixLength = prefix.length;

var manager = require("./manager"), util = require('util');

var step = 1, // var to manage the wizard's steps
css = "", // var to store the css suggested name
iface = ""; // var to store the interface suggested name

colors.setTheme({ // configure the color path
	info : 'grey',
	err : 'red',
	warn : 'yellow',
	folder : 'cyan',
	file : 'green',
	msg : 'green',
	bar : 'white'
});

// to exit from the tool in any moment
rl.on('close', function () {
	console.log('\nHave a great day!'.msg);
	process.exit(0);
});

rl.setPrompt(prefix, prefixLength);
rl.prompt();

// start the wizard
var start = function start () {
	manager.setMode("wizard");
	doTheQuestion();
};

// go to the next step of the wizard
var nextStep = function nextStep (answer) {
	if (step == 2) {
		css = answer + "Style";
	}
	if (step == 6) {
		iface = "I" + answer;
	}
	step++;
	doTheQuestion();
};

// skip a step of the wizard
var skipStep = function skipStep () {
	step++;
	nextStep();
};

// prompt the right question and manage the answer
var doTheQuestion = function doTheQuestion () {
	switch (step) {
		case 1 :
			rl.question("Tell me the module name (myapp.mymodule): ", manager.moduleAnswer.bind(this, cb));
			break;
		case 2 :
			rl.question("Tell me the template name (MyTemplate): ", manager.templateAnswer.bind(this, cb));
			break;
		case 3 :
			rl.question("Do you want to add a script to the template? (Y/n): ", manager.scriptAnswer.bind(this, cb));
			break;
		case 4 :
			rl.question("Tell me the CSS template name: ", manager.cssAnswer.bind(this, cb));
			rl.write(css);
			break;
		case 5 :
			rl.question("Tell me the macro lib name (MyMacroLib): ", manager.macroAnswer.bind(this, cb));
			break;
		case 6 :
			rl.question("Tell me the controller name (MyController): ", manager.controllerAnswer.bind(this, cb));
			break;
		case 7 :
			rl.question("Tell me the interface name: ", manager.interfaceAnswer.bind(this, cb));
			rl.write(iface);
			break;
		case 8 : 
			rl.question("Do you want to create a bootstrap? (Y/n): ", manager.bootstrapAnswer.bind(this, cb));
			break;
		case 9 :
			manager.callGenerator();
			break;
		default :
			console.log("[Error] Generic error!".err);
			break;
	}
};

function cb (value, answer) {
	switch(value) {
		case -1 : 
			start();
			break;
		case 0 : 
			nextStep(answer);
			break;
		case 1 : 
			doTheQuestion();
			break;
		case 2 : 
			skipStep();
			break;
		default :
			break;
	}
};

exports.start = start;
exports.nextStep = nextStep;
exports.skipStep = skipStep;
exports.doTheQuestion = doTheQuestion;