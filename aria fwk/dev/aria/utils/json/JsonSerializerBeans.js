/*
 * Copyright Amadeus
 */
/**
 * Bean definitions associated to the JsonSerializer class
 * @class aria.utils.json.JsonSerializerBeans
 */
Aria.beanDefinitions({
	$package : "aria.utils.json.JsonSerializerBeans",
	$description : "Bean definitions associated to the JsonSerializer class",
	$namespaces : {
		"json" : "aria.core.JsonTypes"
	},
	$beans : {
		"JsonSerializeOptions" : {
			$type : "json:Object",
			$description : "Options given as arguments to the serialize method of JsonSerializer class",
			$restricted : false,
			$properties : {
				"indent" : {
					$type : "json:String",
					$description : "string to use for indentation. \"\" for no indentation",
					$default : "",
					$regExp : /^[\s\t]*$/
				},
				"maxDepth" : {
					$type : "json:Integer",
					$description : "gives the maximum depth after which the conversion must stop (e.g. 1 to have only one level of children)",
					$default : 100
				},
				"escapeKeyNames" : {
					$type : "json:Boolean",
					$description : "true if key names have to be surrounded by double quotes",
					$default : true
				},
				"encodeParameters" : {
					$type : "json:Boolean",
					$description : "if true, parameters will be encoded using encodeURIcomponent()",
					$default : false
				},
				"reversible" : {
					$type : "json:Boolean",
					$description : "If set to true, convertor will try to return an object that can be re-evaluated to its original value, otherwise it will return null",
					$default : false
				},
				"serializedDatePattern" : {
					$type : "json:String",
					$description : "format for date serialization",
					$default : "yyyy/MM/dd HH:mm:ss"
				}
			}
		},
		"JsonSerializeAdvancedOptions" : {
			$type : "JsonSerializeOptions",
			$description : "Enahnced JSON serialization options.",
			$restricted : false,
			$properties : {
				"baseIndent" : {
					$type : "json:String",
					$description : "base indentation to prepend to evert line"
				}
			}
		}
	}
});