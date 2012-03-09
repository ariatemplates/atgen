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
			fs.writeFileSync('README-AT.txt', "README", "utf-8");
		}
	}
	utility.printOutput(changes);
};



exports.generateFile = generateFile;