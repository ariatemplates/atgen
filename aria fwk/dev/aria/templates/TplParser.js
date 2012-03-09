/*
 * Copyright Amadeus
 */
/**
 * TODOC
 * @class aria.templates.TplParser
 */
Aria.classDefinition({
	$classpath : 'aria.templates.TplParser',
	$extends : 'aria.templates.Parser',
	$singleton : true,
	$constructor : function () {
		this.$Parser.constructor.apply(this, arguments);
	},
	$prototype : {
		/**
		 * Parse the given template and return a tree representing the template.
		 * @param {String} template template to parse
		 * @param {object} context template context data, passes additional information the to error log)
		 * @param {Object} statements list of statements allowed by the class generator
		 * @return {aria.templates.TreeBeans.Root} The tree built from the template, or null if an error occured. After
		 * the execution of this method, this.template contains the template with comments and some spaces and removed,
		 * and this.positionToLineNumber can be used to transform positions in this.template into line numbers.
		 */
		parseTemplate : function (template, context, statements) {
			this.context = context;
			this._prepare(template);
			this._computeLineNumbers();
			return this._buildTree();
		}
	}
});