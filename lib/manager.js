// module to manage the user's answers

var wizard = require("./wizard"), utility = require("./utility"), generator = require("./generator");

// JSON object to collect the answers
var proj = {
	"module" : {
		"path" : "",
		"name" : "",
		"classpath" : ""
	},
	"template" : {
		"path" : "",
		"name" : "",
		"filename" : "",
		"classpath" : "",
		"script" : ""
	},
	"controller" : {
		"name" : "",
		"filename" : "",
		"iface" : {
			"name" : "",
			"filename" : ""
		}
	},
	"macro" : {
		"path" : "",
		"name" : "",
		"filename" : "",
		"classpath" : ""
	},
	"cssTemplate" : {
		"path" : "",
		"name" : "",
		"filename" : "",
		"classpath" : ""
	},
	"bootstrap" : {
		"create" : "",
		"name" : ""
	},
	"path" : process.cwd(),
	"mode" : ""
};

// manage the classpath/module name
var moduleAnswer = function moduleAnswer (cb, moduleName) {
	var path = moduleName.replace(/\./gi, "\\");

	if (moduleName != "") {
		var existPath = utility.checkDir(path);
		var cpSplitted = path.split("\\");
		var correctClasspath = utility.checkClasspath(cpSplitted);
		if (existPath) {
			if (!correctClasspath) {
				console.log("[Warning] The classpath should be lowercase.".warn);
			}
			proj.module.classpath = moduleName;			
			cb.call(this, 0, moduleName);
		} else {
			if (correctClasspath) {
				proj.module.path = proj.path + "\\" + path;
				proj.module.classpath = moduleName;			
				cb.call(this, 0, moduleName);
			} else {
				console.log("[Error] You have to provide a lowercase module name.".err);
				cb.call(this, -1);
			}
		}
		proj.module.name = cpSplitted[cpSplitted.length - 1];
	} else {
		console.log("[Error] You have to provide a module name".err);
		cb.call(this, -1);
	}
};

// manage the template answer
var templateAnswer = function templateAnswer (cb, templateName) {
	if (templateName != "") {
		var correctName = utility.checkFileName(templateName);
		var file = templateName + ".tpl";
		var path = proj.module.classpath.replace(/\./gi, "\\") + "\\view";

		if (correctName) {
			var existsView = utility.checkDir(path);
			if ((proj.module.path == "") && (existsView)) {
				var existsTemplate = utility.checkFile(file, path);
				var existsTemplateScript = utility.checkFile(templateName + "Script.js", path);
				if (existsTemplate) {
					console.log("[Warning] ".warn + file.warn + " already exists!".warn);
					cb.call(this, 1);
				} else {
					proj.template.name = templateName
					proj.template.filename = file;
					if (existsTemplateScript) {
						console.log("[Info] ".info + templateName.info + "Script.js already exists!".info);
						proj.template.script = "N";
						cb.call(this, 2);
					} else {
						cb.call(this, 0, templateName);
					}
				}
			} else {
				proj.template.path = proj.path + "\\" + proj.module.classpath.replace(/\./gi, "\\") + "\\view";
				proj.template.name = templateName;
				proj.template.filename = file;
				cb.call(this, 0, templateName);
			}
			proj.template.classpath = proj.module.classpath + "\.view";
		} else {
			console.log("[Error] The template name has to be camel case.".err);
			cb.call(this, 1);
		}
	} else {
		cb.call(this, 2);
	}
};

// manage the script choice
var scriptAnswer = function scriptAnswer (cb, scriptChoice) {
	switch (scriptChoice.trim()) {
		case "Y" :
		case "y" :
		case "N" :
		case "n" :
			proj.template.script = scriptChoice.toUpperCase();
			cb.call(this, 0, scriptChoice);
			break;
		case "" :
			proj.template.script = "Y";
			cb.call(this, 0, scriptChoice);
			break;
		default :
			cb.call(this, 1);
			break;
	}
};

// manage the css answer
var cssAnswer = function cssAnswer (cb, cssName) {
	if (cssName != "") {
		var correctName = utility.checkFileName(cssName);
		var file = cssName + ".tpl.css";
		var path = proj.module.classpath.replace(/\./gi, "\\") + "\\style";

		if (correctName) {
			var existsStyle = utility.checkDir(path);
			if ((proj.module.path == "") && (existsStyle)) {
				var existsCss = utility.checkFile(file, path);
				if (existsCss) {
					console.log("[Warning] ".warn + file.warn + " already exists!".warn);
					cb.call(this, 1);
				} else {
					proj.cssTemplate.name = cssName;
					proj.cssTemplate.filename = file;
					cb.call(this, 0, cssName);
				}
			} else {
				proj.cssTemplate.path = proj.path + "\\" + proj.module.classpath.replace(/\./gi, "\\") + "\\style";
				proj.cssTemplate.name = cssName;
				proj.cssTemplate.filename = file;
				cb.call(this, 0, cssName);
			}
			proj.cssTemplate.classpath = proj.module.classpath + "\.style";
		} else {
			console.log("[Error] The CSS template name has to be camel case.".err);
			cb.call(this, 1);
		}
	} else {
		cb.call(this, 0, cssName);
	}
};

// manage the macro answer
var macroAnswer = function macroAnswer (cb, macroName) {
	if (macroName != "") {
		var correctName = utility.checkFileName(macroName);
		var file = macroName + ".tml";
		var path = proj.module.classpath.replace(/\./gi, "\\") + "\\lib";

		if (correctName) {
			var existsLib = utility.checkDir(path);
			if ((proj.module.path == "") && (existsLib)) {
				var existsMacro = utility.checkFile(file, path);
				if (existsMacro) {
					console.log("[Warning] ".warn + file.warn + " already exists!".warn);
					cb.call(this, 1);
				} else {
					proj.macro.name = macroName;
					proj.macro.filename = file;
					cb.call(this, 0, macroName);
				}
			} else {
				proj.macro.path = proj.path + "\\" + proj.module.classpath.replace(/\./gi, "\\") + "\\lib";
				proj.macro.name = macroName;
				proj.macro.filename = file;
				cb.call(this, 0, macroName);
			}
			proj.macro.classpath = proj.module.classpath + "\.lib";
		} else {
			console.log("[Error] The macro lib name has to be camel case.".err);
			cb.call(this, 1);
		}
	} else {
		cb.call(this, 0, macroName);
	}
};

// manage the controller answer
var controllerAnswer = function controllerAnswer (cb, controllerName) {
	if (controllerName != "") {
		var correctName = utility.checkFileName(controllerName);
		var file = controllerName + ".js";
		var path = proj.module.classpath.replace(/\./gi, "\\");

		if (correctName) {
			var existsController = utility.checkFile(file, path);
			if ((proj.module.path == "") && (existsController)) {
				console.log("[Warning] ".warn + file.warn + " already exists!".warn);
				cb.call(this, 1);
			} else {
				proj.controller.name = controllerName;
				proj.controller.filename = file;
				cb.call(this, 0, controllerName);
			}
		} else {
			console.log("[Error] The controller name has to be camel case.".err);
			cb.call(this, 1);
		}
	} else {
		cb.call(this, 2);
	}
};

// manage the interface answer
var interfaceAnswer = function interfaceAnswer (cb, interfaceName) {
	if (interfaceName != "") {
		var correctName = utility.checkFileName(interfaceName);
		var file = interfaceName + ".js";
		var path = proj.module.classpath.replace(/\./gi, "\\");

		if (correctName) {
			var existsInterface = utility.checkFile(file, path);
			if ((proj.module.path == "") && (existsInterface)) {
				console.log("[Warning] ".warn + file.warn + " already exists!".warn);
				cb.call(this, 1);
			} else {
				proj.controller.iface.name = interfaceName;
				proj.controller.iface.filename = file;
				cb.call(this, 0, interfaceName);
			}
		} else {
			console.log("[Error] The inteface name has to be camel case.".err);
			cb.call(this, 1);
		}
	} else {
		cb.call(this, 1);
	}
};

var bootstrapAnswer = function bootstrapAnswer (cb, bootstrapChoice) {
	switch (bootstrapChoice.trim()) {
		case "Y" :
		case "y" :
		case "" :
			var path = proj.module.classpath.replace(/\./gi, "\\");
			var existsBootstrap = utility.checkFile("index.html", path);
			if ((proj.module.path == "") && (existsBootstrap)) {
				console.log("[Warning] The bootstrap index.html already exists!".warn);
				cb.call(this, 1);
			} else {
				proj.bootstrap.create = "Y";
				proj.bootstrap.name = "index.html";
				cb.call(this, 0, "");
			}
			break;
		case "N" :
		case "n" :
			proj.bootstrap.create = "N";
			proj.bootstrap.name = "";
			cb.call(this, 0, "");
			break;
		default :
			cb.call(this, 1);
			break;
	}
};

var callGenerator = function callGenarator () {
	generator.generateFile(proj);
};

var setMode = function setMode (m) {
	proj.mode = m;
};

exports.setMode = setMode;
exports.moduleAnswer = moduleAnswer;
exports.templateAnswer = templateAnswer;
exports.scriptAnswer = scriptAnswer;
exports.cssAnswer = cssAnswer;
exports.macroAnswer = macroAnswer;
exports.controllerAnswer = controllerAnswer;
exports.interfaceAnswer = interfaceAnswer;
exports.bootstrapAnswer = bootstrapAnswer;
exports.callGenerator = callGenerator;