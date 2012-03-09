/*
 * Copyright Amadeus
 */
/**
 * Generate the class definition for an HTML Template library
 * @class aria.templates.TmlClassGenerator
 */
Aria.classDefinition({
	$classpath : 'aria.templates.TmlClassGenerator',
	$extends : 'aria.templates.ClassGenerator',
	$singleton : true,
	$dependencies : ['aria.templates.TplParser', 'aria.templates.TplClassGenerator'],
	$constructor : function () {
		this.$ClassGenerator.constructor.call(this);

		// Load the Template specific statements
		this._loadStatements(["Library", "id", "on", "createView", "macro", "call", "section", "checkDefault", "@",
				"bindRefreshTo", "repeater"]);

		// Redefine the protected parser
		this._parser = aria.templates.TplParser;

		// Redefine the class used as the parent for templates which do not inherit from any other template
		this._superClass = "aria.templates.Template";

		this._classType = "TML";
		this._rootStatement = "Library";
		this._templateParamBean = "aria.templates.CfgBeans.LibraryCfg";
	},
	$prototype : {
		$init : function (p) {
			var tplClassGen = aria.templates.TplClassGenerator;
			// TODO: instead of copying methods from TplClassGenerator, it may be a good idea to make TmlClassGenerator
			// extend TplClassGenerator in the future (the problem is that TplClassGenerator is a singleton)
			p._processTemplateContent = tplClassGen._processTemplateContent;
		},

		/**
		 * Write to the current block of the class writer the $init method which is used both to import the script
		 * prototype (if any) and to handle macrolibs inheritance.
		 * @param {aria.templates.ClassWriter} out
		 * @protected
		 */
		_writeClassInit : function (out) {
			var tplParam = out.templateParam;
			out.enterBlock("classInit");
			this._writeMapInheritance(out, "__$macrolibs", out.templateParam.$macrolibs, "{}");
			out.leaveBlock();
			this.$ClassGenerator._writeClassInit.call(this, out);
		}
	}
});