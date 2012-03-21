// module to generate a template

var fs = require('fs'), mkdirp = require('mkdirp');

var generateTemplate = function generateTemplate (ariaGenerator, proj, changes) {
	process.chdir(proj.template.path);

		if (proj.template.script == "Y") {
			if (proj.cssTemplate.name != "") {
				var cfg = {
					"$classpath" : proj.template.classpath + "\." + proj.template.name,
					"$hasScript" : true,
					"$css" : [proj.cssTemplate.classpath + "\." + proj.cssTemplate.name]
				};
				var template = ariaGenerator.generateFile("htmltemplate", cfg);
				fs.writeFileSync(proj.template.filename, template.content);

				var cfg2 = {
					"$classpath" : proj.template.classpath + "\." + proj.template.name + "Script"
				};
				var tplScript = ariaGenerator.generateFile("templatescript", cfg2);
				fs.writeFileSync(proj.template.name + "Script.js", tplScript.content);
			} else {
				var htmlTemplate = ariaGenerator.generateHtmlTemplate(proj.template.classpath + "\." + proj.template.name, true, false);
				fs.writeFileSync(proj.template.filename, htmlTemplate[1].content);
				fs.writeFileSync(proj.template.name + "Script.js", htmlTemplate[0].content);
			}
			changes.script = proj.template.name + "Script.js";
		} else {
			if (proj.cssTemplate.name != "") {
				var cfg = {
					"$classpath" : proj.template.classpath + "\." + proj.template.name,
					"$hasScript" : false,
					"$css" : [proj.cssTemplate.classpath + "\." + proj.cssTemplate.name]
				};
				var template = ariaGenerator.generateFile("htmltemplate", cfg);
				fs.writeFileSync(proj.template.filename, template.content);
			} else {
				var htmlTemplate = ariaGenerator.generateHtmlTemplate(proj.template.classpath + "\." + proj.template.name, false, false);
				fs.writeFileSync(proj.template.filename, htmlTemplate[0].content);
			}
		}
		changes.template = proj.template.filename;
		process.chdir(proj.module.path);
};

exports.generateTemplate = generateTemplate;