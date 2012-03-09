/*
 * Copyright Amadeus
 */
/**
 * Bean definitions that are either common to multiple areas of the framework, or are needed before dependencies are
 * loaded by the framework.
 */
Aria.beanDefinitions({
	$package : "aria.core.environment.EnvironmentBaseCfgBeans",
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
				"appSettings" : {
					$type : "AppSettingsCfg",
					$description : "Default application settings for the application",
					$default : {}
				},

				"language" : {
					$type : "LanguageCfg",
					$description : "Default language for the application",
					$default : {
						"primaryLanguage" : "en",
						"region" : "US"
					}
				}
			}
		},

		"AppSettingsCfg" : {
			$type : "json:Object",
			$description : "",
			$properties : {
				"devMode" : {
					$type : "json:Boolean",
					$description : "Indicates if the application is in development mode. Useful i.e. for resource manager - if set to true static RES files will be used instead of requesting them from the server",
					$default : false
				},
				"debug" : {
					$type : "json:Boolean",
					$description : "Indicates if the application is in debug state (strong validation, more error reporting).",
					$default : Aria.debug
				}
			}

		},

		"LanguageCfg" : {
			$type : "json:Object",
			$description : "",
			$properties : {
				"primaryLanguage" : {
					$type : "json:String",
					$description : "Primary language (i.e 'en' in 'en_US')",
					$mandatory : true,
					$regExp : /^[a-z]{2}$/
				},
				"region" : {
					$type : "json:String",
					$description : "Region (i.e US in en_US)",
					$mandatory : true,
					$regExp : /^[A-Z]{2}$/
				}
			}

		},

		"FormatTypes" : {
			$type : "json:MultiTypes",
			$description : "",
			$contentTypes : [{
						$type : "json:String",
						$description : "..."
					}, {
						$type : "json:FunctionRef",
						$description : "..."
					}]

		}

	}
});