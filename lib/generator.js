// boilerplate module

var fs = require('fs'), util = require('util'), mkdirp = require('mkdirp'), utility = require('./utility'), folders = require('./generators/folders'),
	   template = require('./generators/template'),
	   controller = require('./generators/controller'),
	   interFace = require('./generators/interface'),
	   macro = require('./generators/macro'),
	   css = require('./generators/css'),
	   bootstrap = require('./generators/bootstrap');

var generateFile = function generateFile (proj) {
	var atnode = require("./atnode");

	atnode.onLoad({
		fn : function (args) {
			atnode.Aria.load({
				classes : ["aria.ext.filesgenerator.Generator"],
				oncomplete : {
					fn : generate,
					args : {
						atnode : atnode,
						proj : proj
					}
				}
			});
		}
	});
};

function generate (args) {
	var changes = {
		"root" : null,
		"macro" : null,
		"template" : null,
		"script" : null,
		"style" : null,
		"controller" : null,
		"iface" : null,
		"bootstrap" : null,
		"mode" : null
	};
	var ariaGenerator = args.atnode.aria.ext.filesgenerator.Generator, proj = args.proj;

	folders.generateFolders(proj, changes);

	// create the template, template script with the reference to the css
	if (proj.template.name != "") {
		template.generateTemplate(ariaGenerator, proj, changes);
	}

	// create the controller
	if (proj.controller.name != "") {
		controller.generateController(ariaGenerator, proj, changes);
	}
	
	// create the interface
	if (proj.controller.iface.name != "") {
		interFace.generateInterface(ariaGenerator, proj, changes);
	}
	
	// create the macro library file
	if (proj.macro.name != "") {
		macro.generateMacro(ariaGenerator, proj, changes);
	}

	// create the css
	if (proj.cssTemplate.name != "") {
		css.generateCss(ariaGenerator, proj, changes);
	}

	// create the bootstrap
	if (proj.bootstrap.create == "Y") {
		bootstrap.generateBootstrap(ariaGenerator, proj, changes);
	}
	
	if (proj.mode == "wizard") {
		changes.mode = proj.mode;
		// create the readme file
		if (utility.checkFile("README-AT.txt", proj.module.path) == false) {
			fs.writeFileSync('README-AT.txt', readmeContent, "utf-8");
		}
	}
	utility.printOutput(changes);
};

var readmeContent = 
"*** Aria Templates Automatic Tool ***\n" + 
"The Aria Templates Automatic Tool is a tool that helps you build fast aria templates projects.\n" + 
"\n" +
"This file is to explain the content of the folders and the files that it is possible to generate automatically with this tool.\n" +
"\n" +
"\n" +
"## Quick Start\n" +
"\n" +
"git repo link\n" +
"\n" +
"\n" +
"## Features\n" +
"\n" +
"* Cross platform because it runs inside the command line.\n" +
"* It has two working modes: Wizard Mode & Single Command Mode.\n" +
"* It generates the most significat folders' structure for an aria templates project.\n" +
"* It generates the skeletons for all the files that you can create with aria templates.\n" +
"* It check the composition of the files and folders names.\n" +
"\n" +
"\n" +
"## Wizard Mode\n" +
"If you run the tool in wizard mode, using the at gen command, the tool will create this structure:\n" +
"\n" +
"structure:\n" +
"        --- doc\n" +
"        --- model\n" +
"       --- lib\n" +
"           |\n" +
"             --- MyMacro.tml\n" +
"       --- view\n" +
"               |\n" +
"               --- MyTemplate.tpl\n" +
"               --- MyTemplateScript.js\n" +
"        --- style\n" +
"                |\n" +
"                --- MyTemplateStyle.tpl.css\n" +
"        --- MyController.js\n" +
"        --- IMyController.js\n" +
"        --- index.html\n" +
"        --- README-AT.txt\n" +
"\n" +
"Where:\n" +
"\n" +
"- doc folder = it will be the folder where you will store the documentation of your project;\n" +
"- model folder = it will be the folder where you will store your data model;\n" +
"- lib folder = it will be the folder where you will store all your macro library files;\n" +
"- view folder = it will be the folder where you will store all your templates and template scripts;\n" +
"- style folder = it will be the folder where you will store all your css templates;\n" +
"\n" +
"All the Controller, Interfaces and the bootstrap will be added to the root of your project.\n" +
"\n" +
"\n" +
"### Contributing\n" +
"\n" +
"Anyone and everyone is welcome to contribute\n" +
"\n" +
"\n" +
"## Project information\n" +
"\n" +
"* Source: link\n" +
"* Web: link\n" +
"* Docs: link\n" +
"* Twitter: link\n" +
"\n" +
"\n" +
"## License\n" +
"\n" +
"### Major components:\n" +
"\n" +
"* Express: https://github.com/visionmedia/express.git\n" +
"* Optmist: https://github.com/substack/node-optimist.git\n" +
"* Mkdirp: https://github.com/substack/node-mkdirp.git\n" +
"* Colors: https://github.com/Marak/colors.js.git\n" +
"\n" +
"### Everything else:\n" +
"\n" +
"The Unlicense (aka: public domain)\n";

exports.generateFile = generateFile;