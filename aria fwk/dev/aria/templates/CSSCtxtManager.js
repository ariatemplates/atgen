/*
 * Copyright Amadeus
 */
/**
 * List of active CSS templates loaded by Aria.loadTemplate
 * @class aria.templates.CSSCtxtManager
 * @extends aria.core.JsObject
 * @singleton
 */
Aria.classDefinition({
	$classpath : "aria.templates.CSSCtxtManager",
	$dependencies : ["aria.templates.CSSCtxt"],
	$singleton : true,
	$constructor : function () {
		/**
		 * List of active CSS context, It's an object where the key is the CSS template classpath and the value is an
		 * instance of aria.templates.CSSCtxt
		 * @private
		 * @type Object
		 */
		this._contexts = {};
	},
	$destructor : function () {
		this.reset();
	},
	$prototype : {
		/**
		 * Retrieve the CSSContext from the classpath. It creates a new context if it's not already available
		 * @param {String} classpath CSS template classpath
		 * @return {aria.templates.CSSCtxt}
		 */
		getContext : function (classpath, initArgs) {
			var ctxt = this._contexts[classpath];

			// Create a context if missing
			if (!ctxt) {
				ctxt = new aria.templates.CSSCtxt();

				// Override the classpath
				if (!initArgs) {
					initArgs = {};
				}
				initArgs.classpath = classpath;
				ctxt.initTemplate(initArgs);

				this._contexts[classpath] = ctxt;
			}

			return ctxt;
		},
		
		/**
		 * Dispose the Context of a CSS Template. This means that when the CSS Template is loaded again, it's main
		 * macro will be executed again because it might have changed, for instance during a template reload.
		 * @param {String} classpath CSS Template classpath
		 */
		disposeContext : function (classpath) {
			var ctxt = this._contexts[classpath];
			
			if (ctxt) {
				ctxt.$dispose();
				delete this._contexts[classpath];
			}
		},
		
		/**
		 * Dispose all contexts registered on the Manager
		 * @return {Array} List of context classpaths that have been removed 
		 */
		reset : function () {
			var ctxts = [], all = this._contexts;
			
			for (var path in all) {
				if (all.hasOwnProperty(path)) {
					ctxts.push(path);
					all[path].$dispose();
				}
			}
			
			this._contexts = {};
			return ctxts;
		}
	}
});