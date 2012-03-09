/*
 * Copyright Amadeus
 */
/**
 * Base Interface for template context. It is extended by aria.templates.ITemplate to expose methods on
 * aria.templates.TemplateCtxt, and by aria.templates.ICSS for aria.templates.CSSCtxt It defines all the methods that
 * are called by the general macros in aria.templates.ClassGenerator
 * @class aria.templates.IBaseTemplate
 */
Aria.interfaceDefinition({
	$classpath : 'aria.templates.IBaseTemplate',
	$events : {},
	$interface : {
		/**
		 * Write some markup. This method is intended to be called only from the generated code of templates (created in
		 * aria.templates.ClassGenerator) and never directly from developer code. A call to this method is generated for
		 * simple text in templates and for ${...} statements.
		 * @param {String} markup Markup to write.
		 * @private
		 */
		__$write : function (markup) {}
	}
});