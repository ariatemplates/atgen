/*
 * Copyright Amadeus
 */
/**
 * Generate the class definition for a Text Template
 * @class aria.templates.TxtClassGenerator
 * @extends aria.templates.ClassGenerator
 * @singleton
 */
Aria.classDefinition({
	$classpath : 'aria.templates.TxtClassGenerator',
	$extends : 'aria.templates.ClassGenerator',
	$singleton : true,
	$dependencies : ['aria.templates.TxtParser'],
	$constructor : function () {
		this.$ClassGenerator.constructor.call(this);

		// Load the Template specific statements
		this._loadStatements(["TextTemplate", "macro", "call"]);

		// Redefine the protected parser
		this._parser = aria.templates.TxtParser;

		/**
		 * Redefine the class used as the parent for templates which do not inherit from any other template
		 * @type {String}
		 * @protected
		 */
		this._superClass = "aria.templates.TextTemplate";

		/**
		 * Set the classtype
		 * @type {String}
		 * @protected
		 */
		this._classType = "TXT";

		/**
		 * Set the root statement
		 * @type {String}
		 * @protected
		 */
		this._rootStatement = "TextTemplate";

		/**
		 * Set the configuration bean of a text template
		 * @type {String}
		 * @protected
		 */
		this._templateParamBean = "aria.templates.CfgBeans.TextTemplateCfg";
	},
	$prototype : {

		/**
		 * Write to the current block of the class writer the $init method which is used to create a reference to the
		 * processTextTemplate function of the TextTemplate constructor. This reference becomes a property of the
		 * constructor of each text template.
		 * @param {aria.templates.ClassWriter} out
		 * @protected
		 */
		_writeClassInit : function (out) {
			var tplParam = out.templateParam;
			out.enterBlock("classInit");
			out.writeln(out.templateParam.$classpath, ".processTextTemplate = aria.templates.TextTemplate.processTextTemplate;");
			out.leaveBlock();
			this.$ClassGenerator._writeClassInit.call(this, out);
		}
	}
});