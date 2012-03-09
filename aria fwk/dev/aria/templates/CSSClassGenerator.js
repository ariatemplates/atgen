/*
 * Copyright Amadeus
 */
/**
 * Generate the class definition for a CSS Template
 * @class aria.templates.CSSClassGenerator
 * @extends aria.templates.ClassGenerator
 */
Aria.classDefinition({
	$classpath : 'aria.templates.CSSClassGenerator',
	$extends : 'aria.templates.ClassGenerator',
	$singleton : true,
	$dependencies : ['aria.templates.CSSParser'],
	$constructor : function () {
		this.$ClassGenerator.constructor.call(this);

		// Load the Template specific statements
		this.$ClassGenerator._loadStatements.call(this, ["CSSTemplate", "macro", "call"]);

		// Redefine the protected parser
		this._parser = aria.templates.CSSParser;

		// Redefine the class used as the parent for templates which do not inherit from any other template
		this._superClass = "aria.templates.CSSTemplate";

		this._classType = "CSS";
		this._rootStatement = "CSSTemplate";
		this._templateParamBean = "aria.templates.CfgBeans.CSSTemplateCfg";
	},
	$prototype : {}
});