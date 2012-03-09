/*
 * Copyright Amadeus
 */
/**
 * Bean definitions for the Application configuration object for the aria.modules package
 */
Aria.beanDefinitions({
	$package : "aria.modules.environment.EnvironmentCfgBeans",
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
				"requestJsonSerializer" : {
					$type : "RequestJsonSerializerCfg",
					$description : "Default request handler configuration",
					$default : {
						options : {
							encodeParameters : true,
							keepMetadata : false
						}
					}
				}
			}
		},
		"RequestJsonSerializerCfg" : {
			$type : "json:Object",
			$description : "Settings related to the JSON serializer used to convert JSON data to a string before sending a request.",
			$properties : {
				"instance" : {
					$type : "json:ObjectRef",
					$description : "Instance of a class that implements a \"serialize\" method"
				},
				"options" : {
					$type : "json:Map",
					$description : "Argument passed to the \"serialize\" method of the serializer",
					$contentType : {
						$type : "json:MultiTypes",
						$description : "Option to pass as argument to the serialize method of the serializer"
					},
					$default : null
				}
			}
		}
	}
});