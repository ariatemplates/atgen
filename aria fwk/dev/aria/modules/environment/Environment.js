/*
 * Copyright Amadeus
 */
/**
 * Public API for retrieving, applying application variables relative to the RequestMgr.
 * @class aria.modules.environment.Environment
 * @extends aria.core.environment.EnvironmentBase
 * @singleton
 */
Aria.classDefinition({
	$classpath : "aria.modules.environment.Environment",
	$dependencies : ["aria.modules.environment.EnvironmentCfgBeans"],
	$singleton : true,
	$extends : "aria.core.environment.EnvironmentBase",
	$prototype : {
		/**
		 * Classpath of the bean which allows to validate the part of the environment managed by this class.
		 * @type String
		 */
		_cfgPackage : "aria.modules.environment.EnvironmentCfgBeans.AppCfg",

		/**
		 * Get the requestJsonSerializer configuration. It is the current configuration
		 * @public
		 * @return {aria.modules.environment.EnvironmentCfgBeans.RequestJsonSerializerCfg} The JSON serializer
		 * configuration
		 */
		getRequestJsonSerializerCfg : function () {
			return this.checkApplicationSettings("requestJsonSerializer");
		}
	}
});
