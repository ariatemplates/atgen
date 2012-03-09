/*
 * Copyright Amadeus
 */
/**
 * Contains getters for the Number environment.
 * @class aria.utils.environment.WidgetSettings
 * @extends aria.core.environment.EnvironmentBase
 * @singleton
 */
Aria.classDefinition({
	$classpath : "aria.widgets.environment.WidgetSettings",
	$extends : "aria.core.environment.EnvironmentBase",
	$dependencies : ["aria.widgets.environment.WidgetSettingsCfgBeans",
			/* BACKWARD-COMPATIBILITY-BEGIN */"aria.widgetLibs.environment.WidgetLibsSettings"/* BACKWARD-COMPATIBILITY-END */],
	$singleton : true,
	$prototype : {
		/**
		 * Classpath of the bean which allows to validate the part of the environment managed by this class.
		 * @type String
		 */
		_cfgPackage : "aria.widgets.environment.WidgetSettingsCfgBeans.AppCfg",

		/**
		 * This method is deprecated. There is no longer a single default library. Instead of this method, you can
		 * consider using the getWidgetLibs method in aria.widgetLibs.environment.WidgetLibsSettings, along with
		 * Aria.getClassRef.
		 * @public
		 * @return {Object}
		 * @deprecated
		 */
		getWidgetLib : function () {
			return Aria.getClassRef(this.getWidgetLibClassName());
		},

		/**
		 * This method is deprecated. There is no longer a single default library. Instead of this method, you can
		 * consider using the getWidgetLibs method in aria.widgetLibs.environment.WidgetLibsSettings.
		 * @public
		 * @return {String}
		 * @deprecated
		 */
		getWidgetLibClassName : function () {
			this.$logWarn("The getWidgetLibClassName and getWidgetLib methods are deprecated. There is no longer a single default library. Instead of these methods, you can consider using the getWidgetLibs method in aria.widgetLibs.environment.WidgetLibsSettings.");
			return aria.widgetLibs.environment.WidgetLibsSettings.getWidgetLibs().aria;
		},

		/**
		 * Returns the widget settings
		 * @public
		 * @return {aria.widgets.environment.WidgetSettingsCfgBeans.AppCfg.WidgetSettingsCfg}
		 */
		getWidgetSettings : function () {
			return this.checkApplicationSettings("widgetSettings");
		}
	}
});