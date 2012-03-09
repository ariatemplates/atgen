/*
 * Copyright Amadeus
 */
/**
 * Base class for XML request handler, that handles wrong MIME types
 * @class aria.modules.test.XMLRequestHandler
 */
Aria.classDefinition({
	$classpath : "aria.modules.requestHandler.XMLRequestHandler",
	$extends : "aria.modules.requestHandler.RequestHandler",
	$implements : ["aria.modules.requestHandler.IRequestHandler"],
	$statics : {
		MIMETYPE_ERROR : "Response type is badly configured, it should have returned a xml response."
	},
	$prototype : {
		/**
		 * Handles the response from the server, and call the associated callback
		 * @param {aria.modules.RequestBeans.SuccessResponse} successResponse
		 * @param {aria.modules.RequestBeans.Request} request
		 * @param {aria.core.JsObject.Callback} callback to call with the response
		 */
		processSuccess : function (successResponse, request, callback) {
			var res;
			if (!successResponse.responseXML
					|| (successResponse.responseXML && !successResponse.responseXML.documentElement)) {
				res = {
					response : null,
					error : true,
					errorData : {
						"messageBean" : {
							"localizedMessage" : this.MIMETYPE_ERROR,
							"type" : "TYPEERROR"
						}
					}
				};
			} else {
				res = this.processXMLDocument(successResponse.responseXML.documentElement, request);
			}
			this.$callback(callback, res);
		},

		/**
		 * Process the XML document for this response
		 * @param {Object} xmlDocument document element from response
		 * @param {aria.modules.RequestBeans.Request} request
		 * @return {Object} processed data
		 */
		processXMLDocument : function (xmlDocument, request) {
			return {
				response : xmlDocument
			};
		}
	}
});