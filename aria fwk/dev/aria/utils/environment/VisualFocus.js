/*
 * Copyright Amadeus
 */
/**
 * Contains getters for the Visual Focus environment.
 * @class aria.utils.environment.Date
 * @extends aria.core.environment.EnvironmentBase
 * @singleton
 */
Aria.classDefinition({
	$classpath : "aria.utils.environment.VisualFocus",
	$extends : "aria.core.environment.EnvironmentBase",
	$dependencies : ["aria.utils.environment.VisualFocusCfgBeans"],
	$singleton : true,
	$prototype : {
		/**
		 * Classpath of the bean which allows to validate the part of the environment managed by this class.
		 * @type String
		 */
		_cfgPackage : "aria.utils.environment.VisualFocusCfgBeans.AppCfg",

		/**
		 * Get the specified outline style for visual focus
		 * @public
		 * @return {String} outline style
		 */
		getAppOutlineStyle : function () {
			return this.checkApplicationSettings("appOutlineStyle");
		},

		/**
		 * Apply the current environment.
		 * @param {aria.core.JsObject.Callback} callback Will be called after the environment is applied.
		 * @protected
		 */
		_applyEnvironment : function (callback) {
			var appOutlineStyle = this.checkApplicationSettings("appOutlineStyle");
			// load aria.utils.VisualFocus if needed
			if (appOutlineStyle) {
				Aria.load({
					classes : ['aria.utils.VisualFocus'],
					oncomplete : callback ? {
						fn : function () {
							this.$callback(callback);
						},
						scope : this
					} : null
				});
			} else {
				this.$callback(callback);
			}
		}
	}
});