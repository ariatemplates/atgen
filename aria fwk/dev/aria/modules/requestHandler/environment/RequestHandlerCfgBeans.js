/*
 * Copyright Amadeus
 */
/**
 * Bean definitions that are either common to multiple areas of the framework, or are needed before dependencies are
 * loaded by the framework.
 */
Aria.beanDefinitions({
	$package : "aria.modules.requestHandler.environment.RequestHandlerCfgBeans",
	$description : "A definition of the JSON beans used to set the environment settings.",
	$namespaces : {
		"json" : "aria.core.JsonTypes"
	},
	$beans : {
		"AppCfg" : {
			$type : "json:Object",
			$description : "Application environment variables",
			$restricted : false,
			$properties : {
				"requestHandler" : {
					$type : "RequestHandlerCfg",
					$description : "Default request handler configuration",
					$default : {
						implementation : 'aria.modules.requestHandler.APFXMLRequestHandler'
					}
				}
			}
		},
		"RequestHandlerCfg" : {
			$type : "json:Object",
			$description : "Settings related to the request handler used by the request manager by default",
			$properties : {
				"implementation" : {
					$type : "json:PackageName",
					$description : "Classpath of the URL creation strategy implementation",
					$default : null
				},
				"args" : {
					$type : "json:ObjectRef",
					$description : "Arguments passed to the implementation's constructor"

				}
			}
		}
	}
});