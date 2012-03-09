/*
 * Copyright Amadeus
 */
/**
 * Bean definition containing default settings for the Visual Focus environment.
 */
Aria.beanDefinitions({
	$package : "aria.utils.environment.VisualFocusCfgBeans",
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
				"appOutlineStyle" : {
					$type : "json:String",
					$description : "Style of the visual focus to be applied.",
					// the default value is important for the visual focus to be taken into account
					$default : null
				}
			}
		}
	}
});