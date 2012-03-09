// module to generate interface

var fs = require('fs'), mkdirp = require('mkdirp');

var generateInterface = function generateInterface (ariaGenerator, proj, changes) {
	var cfg = {
			"$classpath" : proj.module.classpath + "\." + proj.controller.iface.name,
			"$extends" : "aria.templates.IModuleCtrl",
			"$description" : "TODO create a description"
		};
		var resIface = ariaGenerator.generateFile("interface", cfg);

		fs.writeFileSync(proj.controller.iface.filename, resIface.content);
		changes.iface = proj.controller.iface.filename;
};

exports.generateInterface = generateInterface;