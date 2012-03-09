/*
 * Copyright Amadeus
 */
/**
 * Validates the entry if it is formatted as a simple string without numbers but with special characters.
 * @class aria.utils.validators.String
 * @extends aria.utils.validators.RegExp
 */
Aria.classDefinition({
	$classpath : "aria.utils.validators.String",
	$extends : "aria.utils.validators.RegExp",
	$constructor : function (message) {
		this.$RegExp.constructor.call(this, this.STRING_REGEXP, message);
	},
	$statics : {
		STRING_REGEXP : /^[A-Za-z \-\,\.\'\?\!\:\%\+\=\_\@\;\#\*\(\)\<\>\[\]\/\"]*$/,
		DEFAULT_LOCALIZED_MESSAGE : "Invalid string."
	},
	$prototype : {}
});
