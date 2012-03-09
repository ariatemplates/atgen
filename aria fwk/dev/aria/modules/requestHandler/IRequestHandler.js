/*
 * Copyright Amadeus
 */
/**
 * Interface exposed from the Request Manager to the application. It is used by the request manager handler the response of the request
 * @class aria.modules.requestHandler.IRequestHandler
 */
Aria.interfaceDefinition({
	$classpath : 'aria.modules.requestHandler.IRequestHandler',
	$interface : {
		/**
		 * Handles the response from the server, and call the associated callback
		 * @param {aria.modules.RequestBeans.SuccessResponse} successResponse
		 * @param {aria.modules.RequestBeans.Request} request
		 * @param {aria.core.JsObject.Callback} callback to call with the response
		 */
		processSuccess : function (successResponse, request, callback) {},

		/**
		 * Handles the response from the server, and call the associated callback
		 * @param {aria.modules.RequestBeans.FailureResponse} failureResponse
		 * @param {aria.modules.RequestBeans.Request} request
		 * @param {aria.core.JsObject.Callback} callback to call when the failure is processed
		 */
		processFailure : function (failureResponse, request, callback) {}
	}
});