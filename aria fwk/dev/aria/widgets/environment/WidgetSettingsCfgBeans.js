/*
 * Copyright Amadeus
 */
/**
 * Bean definition containing default settings for the Widget Settings environment.
 */
Aria.beanDefinitions({
	$package : "aria.widgets.environment.WidgetSettingsCfgBeans",
	$namespaces : {
		"json" : "aria.core.JsonTypes",
		"dragDrop" : "aria.utils.dragdrop.DragDropBean"
	},
	$description : "",
	$beans : {
		"AppCfg" : {
			$type : "json:Object",
			$description : "",
			$restricted : false,
			$properties : {
				"widgetSettings" : {
					$type : "WidgetSettingsCfg",
					$description : "Default widget settings for the application",
					$default : {}
				},
				"defaultWidgetLib" : {
					$type : "json:String",
					$description : "Deprecated. There is no longer a single default library. Please use defaultWidgetLibs instead (defined in aria.widgetLibs.environment.WidgetLibsSettingsCfgBeans.AppCfg)."
				}
			}
		},
		"WidgetSettingsCfg" : {
			$type : "json:Object",
			$description : "Global settings for widgets",
			$properties : {
				"directOnBlurValidation" : {
					$type : "json:Boolean",
					$description : "Whether validation on input widgets is automatically called by default on blur.",
					$default : true
				},
				"autoselect" : {
					$type : "json:Boolean",
					$description : "Specifies whether display text should be highlighted when the field is clicked.",
					$default : false
				},
				"middleAlignment" : {
					$type : "json:Boolean",
					$description : "Specifies whether the widgets must be aligned vertically. (The default 'false' value is deprecated, it will be true by default)",
					$default : false
				},
				"dialog" : {
					$type : "json:Object",
					$description : "Default values for Dialog widget configuration.",
					$properties : {
						"movable" : {
							$type : "json:Boolean",
							$description : "If true, the dialog can be moved.",
							$default : false
						},
						"movableProxy" : {
							$type : "dragDrop:ProxyCfg",
							$description : "Specifies the type of proxy dor the dialog motion."
						}
					},
					$default : {}
				}
			}
		}
	}
});