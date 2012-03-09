/*
 * Copyright Amadeus
 */
/**
 * Bean definition containing default settings for the WidgetLibs environment.
 */
Aria.beanDefinitions({
	$package : "aria.widgetLibs.environment.WidgetLibsSettingsCfgBeans",
	$namespaces : {
		"json" : "aria.core.JsonTypes"
	},
	$description : "",
	$beans : {
		"AppCfg" : {
			$type : "json:Object",
			$description : "",
			$restricted : false,
			$properties : {
				"defaultWidgetLibs" : {
					$type : "json:Map",
					$description : "Widget libraries to be available by default in all templates. The key in the map is the prefix used inside the template to refer to that widget library. The value is the classpath of the library. The settings in the environment can be overridden in templates if the same key is used. See also the $wlibs property of the {Template} statement in aria.templates.CfgBeans.TemplateCfg.$wlibs.",
					$contentType : {
						$type : "json:PackageName",
						$description : "Classpath of the widget library."
					},
					$default : {
						"aria" : "aria.widgets.AriaLib"
					}
				}
			}
		}
	}
});