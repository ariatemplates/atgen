/*
 * Copyright Amadeus
 */
Aria.beanDefinitions({
	$package : "aria.widgets.form.AutoCompleteBean",
	$description : "Definition of the suggestions used in the autocomplete",
	$namespaces : {
		"json" : "aria.core.JsonTypes"
	},
	$beans : {
		"Suggestion" : {
			$type : "json:Object",
			$description : "A Label-Code suggestion",
			$properties : {
				"exactMatch" : {
					$type : "json:Boolean",
					$description : "is this entry an exact match in the suggestions",
					$default : false
				}
			}
		}
	}
});