/*
 * Copyright Amadeus
 */
/**
 * @class aria.core.JsClassLoader ClassLoader for js files.
 * @extends aria.core.ClassLoader
 */
Aria.classDefinition({
	$classpath : 'aria.core.JsClassLoader',
	$extends : 'aria.core.ClassLoader',
	$constructor : function () {
		this.$ClassLoader.constructor.apply(this, arguments);
		this._refLogicalPath += ".js";
	},
	$prototype : {
		/**
		 * Called when the .js file is received. This method simply do an eval of the .js file.
		 * @param {String} classdef Content of the .js file
		 * @param {String} lp Logical path of the .js file
		 * @protected
		 */
		_loadClass : function (classdef, lp) {
			Aria.eval(classdef, lp);
			if (!this._classDefinitionCalled) {
				this.$logError(this.MISSING_CLASS_DEFINITION, [this.getRefLogicalPath(), this._refClasspath]);
				aria.core.ClassMgr.notifyClassLoadError(this._refClasspath);
			}
		}
	}
});