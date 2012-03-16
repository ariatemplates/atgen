// module to generate the bootstrap

var fs = require('fs'), mkdirp = require('mkdirp');

var generateBootstrap = function generateBootstrap (ariaGenerator, proj, changes) {
	var cfg = {};
	
	if (proj.template.name != "") {
		if (proj.controller.name != "") {
			cfg = {
				"$classpath" : proj.template.classpath + "\." + proj.template.name,
				"$moduleCtrl" : proj.module.classpath + "\." + proj.controller.name
			};
		} else {
			cfg = {
				"$classpath" : proj.template.classpath + "\." + proj.template.name
			};
		}
	} else {
		if (proj.controller.name != "") {
			cfg = {
				"$moduleCtrl" : proj.module.classpath + "\." + proj.controller.name
			};
		} 
	}
	
	var bootstrap = ariaGenerator.generateFile("bootstrap", cfg);
	fs.writeFileSync(proj.bootstrap.name, bootstrap.content);
	changes.bootstrap = proj.bootstrap.name;
};

exports.generateBootstrap = generateBootstrap;