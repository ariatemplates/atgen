/*
 * Copyright Amadeus
 */
/**
 * Contains getters for the Number environment.
 */
Aria.classDefinition({
	$classpath : "aria.utils.environment.Number",
	$extends : "aria.core.environment.EnvironmentBase",
	$dependencies : ["aria.utils.environment.NumberCfgBeans"],
	$singleton : true,
	$prototype : {
		/**
		 * Classpath of the bean which allows to validate the part of the environment managed by this class.
		 * @type String
		 */
		_cfgPackage : "aria.utils.environment.NumberCfgBeans.AppCfg",

		/**
		 * Return currency formats
		 * @return {aria.utils.environment.Number.CurrencyFormatsCfg}
		 */
		getCurrencyFormats : function () {
			return this.checkApplicationSettings("currencyFormats");
		},

		/**
		 * Return decimal format symbols
		 * @return {aria.utils.environment.NumberCfgBeans.DecimalFormatSymbols}
		 */
		getDecimalFormatSymbols : function () {
			return this.checkApplicationSettings("decimalFormatSymbols");
		}
	}
});