/*
 * Copyright Amadeus
 */
/**
 * Validator for a mandatory value
 * @class aria.utils.validators.Mandatory
 * @extends aria.utils.validators.Validator
 */
Aria.classDefinition({
	$classpath : "aria.utils.validators.Mandatory",
	$extends : "aria.utils.validators.Validator",
	$constructor : function (message) {
		this.$Validator.constructor.call(this, message);
	},
	$destructor : function () {
		this.$Validator.$destructor.call(this);
	},
	$statics : {
		DEFAULT_LOCALIZED_MESSAGE : "This field is a mandatory field."
	},
	$prototype : {
		validate : function (value) {
			if (value) {
				return this._validationSucceeded();
			}
			return this._validationFailed();
		}
	}
});