/*
 * Copyright Amadeus
 */
/**
 * @class aria.utils.Event Various Math utilities
 * @extends aria.core.JsObject
 * @singleton
 */
Aria.classDefinition({
	$classpath : 'aria.utils.Math',
	$singleton : true,
	$dependencies : ['aria.utils.Type'],
	$constructor : function () {
		this.utilType = aria.utils.Type;
	},
	$prototype : {

		/**
		 * Normalize a given value between optional minimum and maximum value. If the value is superior to the maximum,
		 * the maximum is returned. If the value is inferior to the minimum, the minimum is returned. If a non-numerical
		 * value is passed, it is returned without change
		 * @param {Number} value The value to normalize
		 * @param {Number} minValue Optional minimum value to be compared to
		 * @param {Number} maxValue Optional maximum value to be compared to
		 * @return {Number} The normalized value
		 */
		normalize : function (value, minValue, maxValue) {
			var isNumber = this.utilType.isNumber;
			if (!isNumber(value)) {
				// cannot normalize non numerical value
				return value;
			}

			if (isNumber(minValue)) {
				value = Math.max(value, minValue);
			}

			if (isNumber(maxValue)) {
				value = Math.min(value, maxValue);
			}

			return value;
		},
		/**
		 * Calculate the min value from the ones sent in parameters, A null value is not considered
		 * @param {Number} value1 The first value to compare
		 * @param {Number} value2 The second value to compare
		 * @return {Number} The min value
		 */
		min : function (value1, value2) {
			var isNumber = this.utilType.isNumber;
			var isNumber1 = isNumber(value1);
			var isNumber2 = isNumber(value2);
			if (!isNumber1 && !isNumber2) {
				return null;
			} else if (!isNumber1) {
				return value2;
			} else if (!isNumber2) {
				return value1;
			}
			return Math.min(value1, value2);
		},
		/**
		 * Calculate the max value from the ones sent in parameters, A null value is not considered
		 * @param {Number} value1 The first value to compare
		 * @param {Number} value2 The second value to compare
		 * @return {Number} The max value
		 */
		max : function (value1, value2) {
			var isNumber = this.utilType.isNumber;
			var isNumber1 = isNumber(value1);
			var isNumber2 = isNumber(value2);
			if (!isNumber1 && !isNumber2) {
				return null;
			} else if (!isNumber1) {
				return value2;
			} else if (!isNumber2) {
				return value1;
			}
			return Math.max(value1, value2);
		}
	}
});