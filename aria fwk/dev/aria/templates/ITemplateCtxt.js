/*
 * Copyright Amadeus
 */
/**
 * Interface for aria.templates.TemplateCtxt to be accessible from outside the framework, when developping tools to
 * debug or customize Aria Templates applications.
 * @class aria.templates.ITemplateCtxt
 */
Aria.interfaceDefinition({
	$classpath : 'aria.templates.ITemplateCtxt',
	$interface : {
		/**
		 * Classpath of the template.
		 * @type String
		 */
		tplClasspath : "Object",

		/**
		 * Reference to the module controller public interface, if a module controller is linked to the template.
		 * @type Object
		 */
		moduleCtrl : "Object",

		/**
		 * Reference to the module controller whole object, if a module controller is linked to the template.
		 * @type Object
		 */
		moduleCtrlPrivate : "Object",

		/**
		 * Resources from the module controller linked to the template.
		 * @type Object
		 */
		moduleRes : "Object",

		/**
		 * Reference to the flow controller public interface, if a flow controller is linked to the template.
		 * @type Object
		 */
		flowCtrl : "Object",

		/**
		 * Reference to the flow controller whole object, if a flow controller is linked to the template.
		 * @type Object
		 */
		flowCtrlPrivate : "Object",

		/**
		 * Data available in the template through the 'data' variable.
		 * @type Object
		 */
		data : "Object",

		/**
		 * Reload this template context. Note: this will destroy it.
		 * @param {String} tplSource new source for template
		 * @param {aria.core.JsObject.Callback} callback [optional] function called when reload is complete
		 */
		$reload : "Function"
	}
});
