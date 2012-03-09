/*
 * Copyright Amadeus
 */
/**
 * Definition of the suggestions used in the Cities resource handler
 * @class aria.resources.handlers.CitiesResourcesHandlerBean
 */
Aria.beanDefinitions({
	$package : "aria.resources.handlers.CitiesResourcesHandlerBean",
	$description : "Definition of the suggestions used in the Cities resource handler",
	$namespaces : {
		"base" : "aria.widgets.form.AutoCompleteBean",
		"json" : "aria.core.JsonTypes"
	},
	$beans : {
		"Suggestion" : {
			$type : "base:Suggestion",
			$description : "A Label-Code suggestion",
			$properties : {				
				"iata" : {
					$type : "json:String",
					$description : "IATA code for suggestion",
					$sample : 'CDG',
					$mandatory : true
				},
				"cityName" : {
					$type : "json:String",
					$description : "City name",
					$sample : "Paris"
				},
				"stateCode" : {
					$type : "json:String",
					$description : "Code for the state"
				},
				"stateName" : {
					$type : "json:String",
					$description : "Name of the state"
				},
				"countryCode" : {
					$type : "json:String",
					$description : "Code for the country",
					$sample : "FR"
				},
				"countryName" : {
					$type : "json:String",
					$description : "Name of the country for this city",
					$sample : "France"
				}
			}
		}
	}
});