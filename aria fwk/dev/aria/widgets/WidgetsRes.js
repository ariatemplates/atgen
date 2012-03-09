/*
 * Copyright Amadeus
 */
/**
 * @class aria.widgets.WidgetsRes Error messages which can be displayed to the user.
 */
Aria.resourcesDefinition({
	$classpath : 'aria.widgets.WidgetsRes',
	$resources : {
		errors : {
			"40006_WIDGET_NUMBERFIELD_VALIDATION" : "Number field must be a numerical value.",
			"40007_WIDGET_TIMEFIELD_VALIDATION" : "Please enter a valid time format, for example: 1000 or 10:00",
			// For PTR 04203167, we must ensure that the error message below (for date validation) does not contain
			// formats unsuitable for booking a flight (e.g. date in the past like -5)
			"40008_WIDGET_DATEFIELD_VALIDATION" : "Please enter a valid date format, for example: 10/12 or 01MAR or +4",
			"40018_WIDGET_DATEFIELD_MINVALUE" : "Date is before the minimum date.",
			"40019_WIDGET_DATEFIELD_MAXVALUE" : "Date is after the maximum date.",
			"40020_WIDGET_AUTOCOMPLETE_VALIDATION" : "There is no suggestion available for the given entry.",

			"" : "" // empty entry to use commas at the end of each error description (!)
		}
	}
});