/*
 * Copyright Amadeus
 */
/**
 * Contains getters for the Date environment.
 * @class aria.utils.environment.Date
 * @extends aria.core.environment.EnvironmentBase
 * @singleton
 */
Aria.classDefinition({
	$classpath : "aria.utils.environment.Date",
	$dependencies : ["aria.utils.environment.DateCfgBeans"],
	$extends : "aria.core.environment.EnvironmentBase",
	$singleton : true,
	$prototype : {
		/**
		 * Classpath of the bean which allows to validate the part of the environment managed by this class.
		 * @type String
		 */
		_cfgPackage : "aria.utils.environment.DateCfgBeans.AppCfg",

		/**
		 * Get Date configuration
		 * @return {aria.utils.environmentDateCfgBeans.DateFormatsCfg}
		 */
		getDateFormats : function () {
			return this.checkApplicationSettings("dateFormats");
		},

		/**
		 * Get Time configuration
		 * @return {aria.utils.environment.DateCfgBeans.TimeFormatsCfg}
		 */
		getTimeFormats : function () {
			return this.checkApplicationSettings("timeFormats");
		},

		/**
		 * Get First day of week configuration
		 * @return {Integer}
		 */
		getFirstDayOfWeek : function () {
			return this.checkApplicationSettings("firstDayOfWeek");
		}
	}
});