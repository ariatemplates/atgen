// module to generate controller

var fs = require('fs'), mkdirp = require('mkdirp');

var generateController = function generateController (ariaGenerator, proj, changes) {
	var cfg = {
			"$classpath" : proj.module.classpath + "\." + proj.controller.name,
			"$publicInterface" : proj.module.classpath + "\." + proj.controller.iface.name,
			"$extends" : "aria.templates.ModuleCtrl",
			"$description" : "TODO create a description"
		};
	
	var resCtrl = ariaGenerator.generateFile("modulecontroller", cfg);

	fs.writeFileSync(proj.controller.filename, resCtrl.content);
	changes.controller = proj.controller.filename;
};

exports.generateController = generateController;