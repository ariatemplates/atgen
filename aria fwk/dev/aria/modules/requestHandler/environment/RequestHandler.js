/*
 * Copyright Amadeus
 */
/**
 * Public API for retrieving, applying application variables.
 * @class aria.modules.requestHandler.environment.RequestHandler
 * @extends aria.core.environment.EnvironmentBase
 * @singleton
 */
Aria.classDefinition({
	$classpath : "aria.modules.requestHandler.environment.RequestHandler",
	$dependencies : ["aria.modules.requestHandler.environment.RequestHandlerCfgBeans"],
	$singleton : true,
	$extends : "aria.core.environment.EnvironmentBase",
	$prototype : {
		/**
		 * Classpath of the bean which allows to validate the part of the environment managed by this class.
		 * @type String
		 */
		_cfgPackage : "aria.modules.requestHandler.environment.RequestHandlerCfgBeans.AppCfg",

		/**
		 * Get the urlService classpath configuration. It is a copy of the current configuration and not a reference to
		 * the object itself.
		 * @public
		 * @return {aria.modules.requestHandler.environment.RequestHandlerCfgBeans.AppCfg} The classpath configuration
		 */
		getRequestHandlerCfg : function () {
			return aria.utils.Json.copy(this.checkApplicationSettings("requestHandler"));
		}
	}
});
