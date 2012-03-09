/*
 * Copyright Amadeus
 */
Aria.classDefinition({
	$classpath : "aria.modules.urlService.environment.UrlService",
	$dependencies : ["aria.modules.urlService.environment.UrlServiceCfgBeans"],
	$extends : "aria.core.environment.EnvironmentBase",
	$singleton : true,
	$prototype : {
		/**
		 * Classpath of the bean which allows to validate the part of the environment managed by this class.
		 * @type String
		 */
		_cfgPackage : "aria.modules.urlService.environment.UrlServiceCfgBeans.AppCfg",

		/**
		 * Get the urlService classpath configuration. It is a copy of the current configuration and not a reference to
		 * the object itself.
		 * @public
		 * @return {aria.core.environment.Environment.EnvironmentBaseCfgBeans.AppCfg} The classpath configuration
		 */
		getUrlServiceCfg : function () {
			return aria.utils.Json.copy(this.checkApplicationSettings("urlService"));
		}
	}
});