/*
 * Copyright Amadeus
 */
/**
 * Base class for request handler, that handles HTTP errors
 * @class aria.modules.test.RequestHandler
 */
Aria.classDefinition({
	$classpath : "aria.modules.requestHandler.RequestHandler",
	$implements : ["aria.modules.requestHandler.IRequestHandler"],
	$statics : {
		HTTP_ERRORS_GENERAL : "An uncatalogued HTTP error was generated",
		HTTP_ERRORS_400 : "400 Bad Request: The request cannot be fulfilled due to bad syntax.",
		HTTP_ERRORS_401 : "401 Unauthorized: Similar to 403 Forbidden, but specifically for use when authentication is possible but has failed or not yet been provided.",
		HTTP_ERRORS_403 : "403 Forbidden: The request was a legal request, but the server is refusing to respond to it.",
		HTTP_ERRORS_404 : "404 Not Found: The requested resource could not be found but may be available again in the future.  Subsequent requests by the client are permissible.",
		HTTP_ERRORS_500 : "500 Internal Server Error: A generic error message, given when no more specific message is suitable."
	},
	$prototype : {
		/**
		 * Handles the response from the server, and call the associated callback
		 * @param {aria.modules.RequestBeans.SuccessResponse} successResponse
		 * @param {aria.modules.RequestBeans.Request} request
		 * @param {aria.core.JsObject.Callback} callback to call with the response
		 */
		processSuccess : function (successResponse, request, callback) {
			this.$callback(callback, successResponse);
		},

		/**
		 * Handles the response from the server, and call the associated callback
		 * @param {aria.modules.RequestBeans.FailureResponse} failureResponse
		 * @param {aria.modules.RequestBeans.Request} request
		 * @param {aria.core.JsObject.Callback} callback to call when the failure is processed
		 */
		processFailure : function (failureResponse, request, callback) {

			var status = failureResponse.status;

			// resource forwarded to the callback
			var res = {
				response : null,
				error : true
			};

			// HTTP error
			var messageId = "HTTP_ERRORS_" + status;
			var message = this[messageId];
			if (!message) {
				message = this.HTTP_ERRORS_GENERAL;
			}

			res.errorData = {
				"messageBean" : {
					"code" : status,
					"localizedMessage" : message,// currently sourced from res, to be migrated to the db as a
					// part of another sprint task.
					"type" : "HTTPERROR"
				}
			};

			this.$callback(callback, res);
		}
	}
});