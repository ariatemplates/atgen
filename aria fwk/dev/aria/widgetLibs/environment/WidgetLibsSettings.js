/*
 * Copyright Amadeus
 */
/**
 * Contains getters for the WidgetLibs environment.
 * @singleton
 */
Aria.classDefinition({
	$classpath : "aria.widgetLibs.environment.WidgetLibsSettings",
	$extends : "aria.core.environment.EnvironmentBase",
	$dependencies : ["aria.widgetLibs.environment.WidgetLibsSettingsCfgBeans"],
	$singleton : true,
	$prototype : {
		/**
		 * Classpath of the bean which allows to validate the part of the environment managed by this class.
		 * @type String
		 */
		_cfgPackage : "aria.widgetLibs.environment.WidgetLibsSettingsCfgBeans.AppCfg",

		/**
		 * Return default widget libraries.
		 * @public
		 * @return {aria.widgetLibs.environment.WidgetLibsSettingsCfgBeans.AppCfg.defaultWidgetLibs}
		 */
		getWidgetLibs : function () {
			var res = this.checkApplicationSettings("defaultWidgetLibs");

			/* BACKWARD-COMPATIBILITY-BEGIN */
			var ariaLib = this.checkApplicationSettings("defaultWidgetLib");
			if (ariaLib) {
				// make a copy before changing the value:
				res = aria.utils.Json.copy(res, false);
				res.aria = ariaLib;
			}
			/* BACKWARD-COMPATIBILITY-END */

			return res;
		}
	}
});