// module to generate the bootstrap

var fs = require('fs'), mkdirp = require('mkdirp'), configHandler = require('../configHandler');

var generateBootstrap = function generateBootstrap (ariaGenerator, proj, changes) {
	var cfg = {};
	var version = configHandler.getFrameworkVersion();
	
	if (proj.template.name != "") {
		if (proj.controller.name != "") {
			cfg = {
				"$classpath" : proj.template.classpath + "\." + proj.template.name,
				"$fwkpath" : "/aria/aria-templates-" + version,
				"$fwkskin" : "/css/atdefskin-" + version,
				"$moduleCtrl" : proj.module.classpath + "\." + proj.controller.name
			};
		} else {
			cfg = {
				"$classpath" : proj.template.classpath + "\." + proj.template.name,
				"$fwkpath" : "/aria/aria-templates-" + version,
				"$fwkskin" : "/css/atdefskin-" + version
			};
		}
	} else {
		if (proj.controller.name != "") {
			cfg = {
				"$fwkpath" : "/aria/aria-templates-" + version,
				"$fwkskin" : "/css/atdefskin-" + version,
				"$moduleCtrl" : proj.module.classpath + "\." + proj.controller.name
			};
		} 
	}
	
	var bootstrap = ariaGenerator.generateFile("bootstrap", cfg);
	fs.writeFileSync(proj.bootstrap.name, bootstrap.content);
	changes.bootstrap = proj.bootstrap.name;
};

exports.generateBootstrap = generateBootstrap;