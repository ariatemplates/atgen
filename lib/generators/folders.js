// module to generate the folders

var fs = require('fs'), mkdirp = require('mkdirp'), utility = require('../utility');

var generateFolders = function generateFolders (proj, changes) {
	// create the project path
	if (proj.module.path != "") {
		mkdirp.sync(proj.module.path);
	} else {
		proj.module.path = proj.path + "\\" + proj.module.classpath.replace(/\./gi, "\\");
	}
	process.chdir(proj.module.path);
	changes.root = proj.module.classpath.replace(/\./gi, "\\");
	
	// create the view folder
	if (proj.template.path != "") {
		mkdirp.sync(proj.template.path);
	} else {
		proj.template.path = proj.module.path + "\\view";
	}

	// create the lib folder
	if (proj.macro.path != "") {
		mkdirp.sync(proj.macro.path);
	} else {
		proj.macro.path = proj.module.path + "\\lib";
	}

	// create the style folder
	if (proj.cssTemplate.path != "") {
		mkdirp.sync(proj.cssTemplate.path);
	} else {
		proj.cssTemplate.path = proj.module.path + "\\style";
	}
	
	if (proj.mode == "wizard") {
		changes.mode = proj.mode;
		// create the doc folder
		if (utility.checkDir(proj.module.path + "\\doc") == false) {
			mkdirp.sync(proj.module.path + "\\doc");
		}

		// create the model folder
		if (utility.checkDir(proj.module.path + "\\model") == false) {
			mkdirp.sync(proj.module.path + "\\model");
		}
	}
};

exports.generateFolders = generateFolders;