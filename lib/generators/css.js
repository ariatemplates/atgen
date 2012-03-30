// module to generate css template

var fs = require('fs');

var generateCss = function generateCss (ariaGenerator, proj, changes) {
	process.chdir(proj.cssTemplate.path);

	var cfg = {
		"$classpath" : proj.cssTemplate.classpath + "\." + proj.cssTemplate.name
	};
	var result = ariaGenerator.generateFile("csstemplate", cfg);

	fs.writeFileSync(proj.cssTemplate.filename, result.content);

	process.chdir(proj.module.path);
	changes.style = proj.cssTemplate.filename;
};

exports.generateCss = generateCss;