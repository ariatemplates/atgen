/*
 * Copyright Amadeus
 */
/**
 * Validates the entry if it is formatted as a number.
 * @class aria.utils.validators.Number
 * @extends aria.utils.validators.RegExp
 */
Aria.classDefinition({
	$classpath : "aria.utils.validators.Number",
	$extends : "aria.utils.validators.RegExp",
	$constructor : function (message) {
		this.$RegExp.constructor.call(this, this.NUM_REGEXP, message);
	},
	$statics : {
		NUM_REGEXP : /^-?[0-9]+([\.,][0-9]+)?$/,
		DEFAULT_LOCALIZED_MESSAGE : "Invalid NUM string."
	},
	$prototype : {}
});
