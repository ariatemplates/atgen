// module to generate macro

var fs = require('fs');

var generateMacro = function generateMacro (ariaGenerator, proj, changes) {
	process.chdir(proj.macro.path);

	var cfg = {
		"$classpath" : proj.macro.classpath + "\." + proj.macro.name
	};
	var result = ariaGenerator.generateFile("macrolibrary", cfg);

	fs.writeFileSync(proj.macro.filename, result.content);
	process.chdir(proj.module.path);
	changes.macro = proj.macro.filename;
};

exports.generateMacro = generateMacro;