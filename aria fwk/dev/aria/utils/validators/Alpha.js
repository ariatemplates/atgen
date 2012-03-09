/*
 * Copyright Amadeus
 */
/**
 * Validates that a string is an Alpha type
 * @class aria.utils.validators.Alpha
 * @extends aria.utils.validators.RegExp
 */
Aria.classDefinition({
	$classpath : "aria.utils.validators.Alpha",
	$extends : "aria.utils.validators.RegExp",
	$constructor : function (message) {
		this.$RegExp.constructor.call(this, this.ALPHA_REGEXP, message);
	},
	$statics : {
		ALPHA_REGEXP : /^[A-Za-z]+$/,
		DEFAULT_LOCALIZED_MESSAGE : "Invalid ALPHA string."
	},
	$prototype : {}
});
