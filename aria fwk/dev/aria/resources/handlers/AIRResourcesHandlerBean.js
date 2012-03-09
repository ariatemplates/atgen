/*
 * Copyright Amadeus
 */
/**
 * Definition of the suggestions used in the LC resource handler
 * @class aria.resources.handlers.AIRResourcesHandlerBean
 */
Aria.beanDefinitions({
	$package : "aria.resources.handlers.AIRResourcesHandlerBean",
	$description : "Definition of the suggestions used in the AIR resource handler",
	$namespaces : {
		"base" : "aria.widgets.form.AutoCompleteBean",
		"json" : "aria.core.JsonTypes"
	},
	$beans : {
		"Suggestion" : {
			$type : "base:Suggestion",
			$description : "A Label-Code suggestion",
			$properties : {
				"type" : {
					$type : "json:Integer",
					$description : "Type of airport. 1 for city, 2 for airport",
					$sample : 1
				},
				"iata" : {
					$type : "json:String",
					$description : "IATA code for suggestion",
					$sample : 'CDG',
					$mandatory : true
				},
				"cityName" : {
					$type : "json:String",
					$description : "City name for this airport",
					$sample : "Paris"
				},
				"airportName" : {
					$type : "json:String",
					$description : "Name of airport",
					$sample : "Charles de Gaulle"
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
					$description : "Name of the country for this airport",
					$sample : "France"
				}
			}
		}
	}
});