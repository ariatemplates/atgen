/*
 * Copyright Amadeus
 */
/**
 * Validates the entry if it is formatted as something like a phone.
 * @class aria.utils.validators.Phone
 * @extends aria.utils.validators.RegExp
 */
Aria.classDefinition({
	$classpath : "aria.utils.validators.Phone",
	$extends : "aria.utils.validators.RegExp",
	$constructor : function (message) {
		this.$RegExp.constructor.call(this, this.PHONE_REGEXP, message);
	},
	$statics : {
		PHONE_REGEXP : /^[A-Za-z0-9 \-\+\(\)]{2,30}$/,
		DEFAULT_LOCALIZED_MESSAGE : "Invalid PHONE string."
	},
	$prototype : {}
});
