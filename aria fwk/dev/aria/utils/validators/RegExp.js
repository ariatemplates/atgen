/*
 * Copyright Amadeus
 */
/**
 * A Base RegExp utility extended by all regex type utilities.
 * @class aria.utils.validators.RegExp
 * @extends aria.utils.validators.Validator
 */
Aria.classDefinition({
	$classpath : "aria.utils.validators.RegExp",
	$extends : "aria.utils.validators.Validator",
	$constructor : function (regexp, message) {
		this.$Validator.constructor.call(this, message);

		/**
		 * Regular expression used to validate values.
		 * @private
		 * @type {RegExp}
		 */
		this._regexp = regexp;
	},
	$destructor : function () {
		this._regexp = null;
		this.$Validator.$destructor.call(this);
	},
	$prototype : {

		/**
		 * Validates that a string matches the regular expression.
		 * @param {String} value The string you want to validate
		 * @return {Object}
		 */
		validate : function (value) {
			if (value == null || value === "") {
				// the regexp validator always accepts empty values (it is not a mandatory validator)
				return this._validationSucceeded();
			}
			if (!this._regexp.test(value)) {
				return this._validationFailed();
			}
			return this._validationSucceeded();
		}
	}
});