/*
 * Copyright Amadeus
 */
/**
 * Base class from which all templates inherit. This is extended by aria.templates.Template for HTML templates or
 * aria.templates.CSSTemplate for CSS Templates
 * @class aria.templates.BaseTemplate
 * @extends aria.core.JsObject
 */
Aria.classDefinition({
	$classpath : 'aria.templates.BaseTemplate',
	$dependencies : ['aria.templates.IBaseTemplate', 'aria.utils.Json'],
	$constructor : function () {},
	$destructor : function () {
		/* this is important for $destructor not to be overridden by the one of ITemplate interface */
	},
	$statics : {
		// ERROR MESSAGES:
		EXCEPTION_IN_MACRO : "Uncaught exception in macro '%1', line %2",
		EXCEPTION_IN_VARINIT : "Uncaught exception when initializing global variables in template '%0'.",
		ITERABLE_UNDEFINED : "line %2: Template error: cannot iterate over a null or undefined variable.",
		EXCEPTION_IN_EXPRESSION : "line %2: Uncaught runtime exception in expression '%1'",
		EXCEPTION_IN_VAR_EXPRESSION : "line %2: Uncaught runtime exception in var expression '%1'",
		EXCEPTION_IN_SET_EXPRESSION : "line %2: Uncaught runtime exception in set expression '%1'",
		EXCEPTION_IN_CHECKDEFAULT_EXPRESSION : "line %2: Uncaught runtime exception in checkdefault expression '%1'",
		MACRO_NOT_FOUND : "line %1: Template error: macro '%2' is not defined."
	},
	$prototype : {
		$json : aria.utils.Json,

		/**
		 * Prototype init method called at prototype creation time Allows to store class-level objects that are shared
		 * by all instances
		 * @param {Object} p the prototype object being built
		 * @param {Object} def the class definition
		 */
		$init : function (p, def) {
			// copy the prototype of IBaseTemplate:
			var itf = aria.templates.IBaseTemplate.prototype;
			for (var k in itf) {
				if (itf.hasOwnProperty(k) && !p.hasOwnProperty(k)) {
					// copy methods which are not already on this object (this avoids copying $classpath and
					// $destructor)
					p[k] = itf[k];
				}
			}
		}
	}
});