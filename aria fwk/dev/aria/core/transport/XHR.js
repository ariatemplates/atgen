/*
 * Copyright Amadeus
 */
/**
 * Transport class for XHR requests.
 * @class aria.core.transport.XHR
 * @extends aria.core.JsObject
 * @singleton
 */
Aria.classDefinition({
	$classpath : "aria.core.transport.XHR",
	$extends : "aria.core.transport.BaseXHR",
	$singleton : true,
	$constructor : function () {
		this.$BaseXHR.constructor.call(this);
	},
	$prototype : {
		/**
		 * Tells if the browser implementation of XMLHttpRequest supports CORS
		 * @return {Boolean}
		 */
		hasCORS : function () {
			return ("withCredentials" in this._standardXHR());
		}
	}
});