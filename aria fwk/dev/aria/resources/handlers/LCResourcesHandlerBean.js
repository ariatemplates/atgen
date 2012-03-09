/*
 * Copyright Amadeus
 */
/**
 * Definition of the suggestions used in the LC resource handler
 * @class aria.resources.handlers.LCResourcesHandlerBean
 */
Aria.beanDefinitions({
	$package : "aria.resources.handlers.LCResourcesHandlerBean",
	$description : "Definition of the suggestions used in the LC resource handler",
	$namespaces : {
		"base" : "aria.widgets.form.AutoCompleteBean",
		"json" : "aria.core.JsonTypes"
	},
	$beans : {
		"Suggestion" : {
			$type : "base:Suggestion",
			$description : "A Label-Code suggestion",
			$restricted : false,
			$properties : {
				"label" : {
					$type : "json:String",
					$description : "label for this suggestion",
					$sample : "Paris",
					$mandatory : true
				},
				"code" : {
					$type : "json:String",
					$description : "A code matching this suggestion",
					$sample : "PAR"
				}
			}
		}
	}
});