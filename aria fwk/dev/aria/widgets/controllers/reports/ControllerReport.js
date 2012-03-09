/*
 * Copyright Amadeus
 */
/**
 * Report emitted by a controller on a check
 * @class aria.widgets.controllers.reports.ControllerReport
 * @extends aria.core.JsObject
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.controllers.reports.ControllerReport',
	$dependencies : [],
	$constructor : function () {
		/**
		 * Specifies if the value given to the controller was correct
		 * @type {Boolean}
		 */
		this.ok = null;

		/**
		 * Controller specifies if the keystroke has to be canceled
		 * @type {}
		 */
		this.cancelKeyStroke = false;

		/**
		 * true if the displayed value matches the begining of a correct value
		 * @type {Boolean}
		 */
		this.matchCorrectValueStart = false;

		/**
		 * Propose a best value for the input
		 * @type {String}
		 */
		this.text = null;

		/**
		 * Internal value associated to the display
		 * @type {Object}
		 */
		this.value;

		/**
		 * used to return any error messages associated to an internal validation
		 * @type {Array}
		 */
		this.errorMessages = [];

		/**
		 * Position of caret start
		 * @type {Number}
		 */
		this.caretPosStart = null;

		/**
		 * Position of caret end
		 * @type {Number}
		 */
		this.caretPosEnd = null;

	},
	$destructor : function () {
		this.ok = null;
		this.internalValue = null;
		this.errorMessages = null;
	}

});