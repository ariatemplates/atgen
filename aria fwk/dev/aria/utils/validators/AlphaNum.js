/*
 * Copyright Amadeus
 */
/**
 * Validates Alpha Numeric characters only.
 * @class aria.utils.validators.AlphaNum
 * @extends aria.utils.validators.RegExp
 */
Aria.classDefinition({
	$classpath : "aria.utils.validators.AlphaNum",
	$extends : "aria.utils.validators.RegExp",
	$constructor : function (message) {
		this.$RegExp.constructor.call(this, this.ALPHANUM_REGEXP, message);
	},
	$statics : {
		ALPHANUM_REGEXP : /^[A-Za-z0-9]+$/,
		DEFAULT_LOCALIZED_MESSAGE : "Invalid ALPHANUM string."
	},
	$prototype : {}
});