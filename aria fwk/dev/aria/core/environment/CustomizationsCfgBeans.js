/*
 * Copyright Amadeus
 */
Aria.beanDefinitions({
	$package : "aria.core.environment.CustomizationsCfgBeans",
	$description : "A definition of the JSON beans used to set the environment settings.",
	$namespaces : {
		"json" : "aria.core.JsonTypes"
	},
	$beans : {
		"AppCfg" : {
			$type : "json:Object",
			$description : "Application environment variables.",
			$restricted : false,
			$properties : {
				"customization" : {
					$type : "CustomizationCfg",
					$description : "Customization configuration",
					$default : {}
				}
			}
		},
		"CustomizationCfg" : {
			$type : "json:Object",
			$description : "",
			$properties : {
				"descriptor" : {
					$type : "json:MultiTypes",
					$description : "",
					$default : "",
					$contentTypes : [{
								$type : "json:ObjectRef",
								$description : "Json object containing customization descriptors"
							}, {
								$type : "json:String",
								$description : "Absolute or relative URL of the Customization Descriptor"
							}]
				}
			}
		},
		"DescriptorCfg" : {
			$type : "json:Object",
			$description : "Customization descriptor file",
			$properties : {
				"templates" : {
					$type : "json:Map",
					$description : "Templates substitution configuration", // example property --> "oldCP" : "newCP"
					$default : {},
					$keyType : {
						$type : "json:PackageName",
						$description : "Classpath of the template to be replaced by another one."
					},
					$contentType : {
						$type : "json:PackageName",
						$description : "Classpath of the customized template."
					}
				},
				"modules" : {
					$type : "json:Map",
					$default : {},
					$description : "Custom modules configuration",
					$keyType : {
						$type : "json:PackageName",
						$description : "Classpath of the module to which custom modules will be attached."
					},
					$contentType : {
						$type : "json:Array",
						$description : "Array of custom sub-modules to be attached to a module.",
						$contentType : {
							$type : "CustomModuleCfg"
						}
					}
				},
				"flows" : {
					$type : "json:Map",
					$description : "Custom Flow configuration",
					$default : {},
					$keyType : {
						$type : "json:PackageName",
						$description : "Classpath of the flow to be replaced by another one."
					},
					$contentType : {
						$type : "json:PackageName",
						$description : "Classpath of the customized flow"
					}
				}
			}
		},
		"CustomModuleCfg" : {
			$type : "json:MultiTypes",
			$description : "Custom module description, which can be either a classpath only or an object containing classpath, initArgs and refpath.",
			$contentTypes : [{
						$type : "json:String",
						$description : "Classpath of the custom module."
					}, {
						$type : "json:Object",
						$description : "Parameters to load the custom module.",
						$properties : {
							"classpath" : {
								$type : "json:PackageName",
								$description : "Classpath of the custom module."
							},
							"refpath" : {
								$type : "json:String",
								$regExp : /^custom:/,
								$description : "Refpath where to store the custom module."
							},
							"initArgs" : {
								$type : "json:ObjectRef",
								$description : "Parameters to give to the custom module."
							}
						}
					}]
		}
	}
});