/*
 * Copyright Amadeus
 */
/**
 * Json handler, that handles JSON as weel as a javascript object retrieved in responseJSON
 * @class aria.modules.test.JSONRequestHandler
 */
Aria.classDefinition({
	$classpath : "aria.modules.requestHandler.JSONRequestHandler",
	$extends : "aria.modules.requestHandler.RequestHandler",
	$implements : ["aria.modules.requestHandler.IRequestHandler"],
	$statics : {
		PARSING_ERROR : "Response text could not be evaluated as JSON."
	},
	$prototype : {
		/**
		 * Handles the response from the server, and call the associated callback
		 * @param {aria.modules.RequestBeans.SuccessResponse} successResponse
		 * @param {aria.modules.RequestBeans.Request} request
		 * @param {aria.core.JsObject.Callback} callback to call with the response
		 */
		processSuccess : function (successResponse, request, callback) {
			var res = {};
			if (successResponse.responseJSON) {
				res.response = successResponse.responseJSON;
			} else if (successResponse.responseText) {
				res.response = aria.utils.Json.load(successResponse.responseText, this, this.PARSING_ERROR);
				if (!res.response) {
					res.error = true;
				}
				if (res.error) {
					res.errorData = {
						"messageBean" : {
							"localizedMessage" : this.PARSING_ERROR,
							"type" : "PARSINGERROR"
						}
					}
				}
			} else {
				// no data : no error
				res.response = null;
			}
			this.$callback(callback, res);
		}
	}
});