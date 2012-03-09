/*
 * Copyright Amadeus
 */
/**
 * Validator to format an email address
 * @class aria.utils.validators.Email
 * @extends aria.utils.validators.RegExp
 */
Aria.classDefinition({
	$classpath : "aria.utils.validators.Email",
	$extends : "aria.utils.validators.RegExp",
	$constructor : function (message) {
		this.$RegExp.constructor.call(this, this.EMAIL_REGEXP, message);
	},
	$statics : {
		EMAIL_REGEXP : /^[A-Za-z0-9!#$%&;'=^_~\*\+\-\/\?\`\{\|\}]+(?:\.[A-Za-z0-9!#$%&;'~=^_\*\+\-\/\?\`\{\|\}]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9\-]*[A-Za-z0-9])?$/,
		DEFAULT_LOCALIZED_MESSAGE : "Invalid e-mail."
	},
	$prototype : {}
});