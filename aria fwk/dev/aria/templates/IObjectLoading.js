/*
 * Copyright Amadeus
 */
/**
 * Interface for an object which raises an event when an object is loaded.
 * @class aria.templates.IObjectLoading
 */
Aria.interfaceDefinition({
	$classpath : 'aria.templates.IObjectLoading',
	$events : {
		"objectLoaded" : {
			description : "Raised when the object load is complete.",
			properties : {
				"object" : "Reference to the object just loaded."
			}
		}
	},
	$interface : {}
});
