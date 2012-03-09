/*
 * Copyright Amadeus
 */
/**
 * Object representing a callback. Does normalization on creation, and expose a simple call method
 * @class aria.utils.Callback
 */
Aria.classDefinition({
	$classpath : 'aria.utils.Callback',
	/**
	 * Creates a callback instance
	 * @param {Object} callbackDefinition, an object or directly a function reference.
	 * 
	 * <pre>
	 * 	{
	 * 		fn : ..., // a function reference
	 *  	scope : ..., // Object to use as a scope, optional
	 *  	args : ... // callback second argument, optional 
	 * 	}
	 * </pre>
	 */
	$constructor : function (callbackDefinition) {

		// normalise definition
		callbackDefinition = this.$normCallback(callbackDefinition);

		/**
		 * Scope for callback execution
		 * @type Object
		 */
		this._scope = callbackDefinition.scope;

		/**
		 * Function to execute
		 * @type Function
		 */
		this._function = callbackDefinition.fn;

		/**
		 * Arguments given when creating the callback
		 */
		this._args = callbackDefinition.args;

	},
	$destructor : function () {
		this._scope = null;
		this._function = null;
		this._args = null;
	},
	$prototype : {

		/**
		 * Execute the callback
		 * @param {Object} event
		 */
		call : function (evt) {
			return this._function.call(this._scope, evt, this._args);
		}
	}
});