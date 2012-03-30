// module to generate the skeleton's file

var fs = require('fs'), utility = require('./utility'), 
	   folders = require('./generators/folders'),
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
"*** Aria Templates Automatic Tool ***\r\n" + 
"The Aria Templates Automatic Tool is a tool that helps you build fast aria templates projects.\r\n" + 
"\r\n" +
"This file is to explain the content of the folders and the files that it is possible to generate automatically with this tool.\r\n" +
"\r\n" +
"\r\n" +
"## Quick Start\r\n" +
"\r\n" +
"git repo link\r\n" +
"\r\n" +
"\r\n" +
"## Features\r\n" +
"\r\n" +
"* Cross platform because it runs inside the command line.\r\n" +
"* It has two working modes: Wizard Mode & Single Command Mode.\r\n" +
"* It generates the most significant folders' structure for an aria templates project.\r\n" +
"* It generates the skeletons for all the files that you can create with aria templates.\r\n" +
"* It check the composition of the files and folders names.\r\n" +
"\r\n" +
"\r\n" +
"## Wizard Mode\r\n" +
"If you run the tool in wizard mode, using the atgen command, the tool will create this structure:\r\n" +
"\r\n" +
"structure:\r\n" +
"        --- doc\r\n" +
"        --- model\r\n" +
"        --- lib\r\n" +
"           |\r\n" +
"           --- MyMacro.tml\r\n" +
"        --- view\r\n" +
"               |\r\n" +
"               --- MyTemplate.tpl\r\n" +
"               --- MyTemplateScript.js\r\n" +
"        --- style\r\n" +
"                |\r\n" +
"                --- MyTemplateStyle.tpl.css\r\n" +
"        --- MyController.js\r\n" +
"        --- IMyController.js\r\n" +
"        --- index.html\r\n" +
"        --- README-AT.txt\r\n" +
"\r\n" +
"Where:\r\n" +
"\r\n" +
"- doc folder = it will be the folder where you will store the documentation of your project;\r\n" +
"- model folder = it will be the folder where you will store your data model;\r\n" +
"- lib folder = it will be the folder where you will store all your macro library files;\r\n" +
"- view folder = it will be the folder where you will store all your templates and template scripts;\r\n" +
"- style folder = it will be the folder where you will store all your css templates;\r\n" +
"\r\n" +
"All the Controller, Interfaces and the bootstrap will be added to the root of your project.\r\n" +
"\r\n" +
"\r\n" +
"### Contributing\r\n" +
"\r\n" +
"Anyone and everyone is welcome to contribute\r\n" +
"\r\n" +
"\r\n" +
"## Project information\r\n" +
"\r\n" +
"* Source: link\r\n" +
"* Web: link\r\n" +
"* Docs: link\r\n" +
"* Twitter: link\r\n" +
"\r\n" +
"\r\n" +
"## License\r\n" +
"\r\n" +
"### Major components:\r\n" +
"\r\n" +
"* Express: https://github.com/visionmedia/express.git\r\n" +
"* Optmist: https://github.com/substack/node-optimist.git\r\n" +
"* Mkdirp: https://github.com/substack/node-mkdirp.git\r\n" +
"* Colors: https://github.com/Marak/colors.js.git\r\n" +
"\r\n" +
"### Everything else:\r\n" +
"\r\n" +
"The Unlicense (aka: public domain)\r\n";

exports.generateFile = generateFile;