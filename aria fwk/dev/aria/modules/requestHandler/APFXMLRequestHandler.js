/*
 * Copyright Amadeus
 */


/**
 * APF+ request handler
 * @class aria.modules.test.APFXMLRequestHandler
 */
Aria.classDefinition({
	$classpath : "aria.modules.requestHandler.APFXMLRequestHandler",
	$extends : "aria.modules.requestHandler.XMLRequestHandler",
	$implements : ["aria.modules.requestHandler.IRequestHandler"],
	$dependencies : ['aria.utils.Json'],
	$statics : {
		JSON_ERROR_ON_FRAMEWORK : "Invalid Framework data have been received in the server response:\n %2",
		JSON_ERROR_ON_DATA : "Invalid data have been received in the server response:\n %2",
		JSON_ERROR_ON_ERRORS : "Invalid Errors data have been received in the server response:\n %2"
	},
	$prototype : {

		/**
		 * Extract CDATA fragment from an XML node
		 * @param {Object} node XML node
		 * @param {String} errorMessage to use if eval failed
		 * @return {Object}
		 */
		_extractCDATAasJSON : function (node, errorMessage) {

			var childNodes = node.childNodes;
			var length = childNodes.length;
			var CDATA_SECTION_NODE = 4;

			for (var i = 0; i < length; i++) {
				var child = childNodes[i];
				if (child.nodeType === CDATA_SECTION_NODE) {
					var strValue = child.nodeValue;
					return {
						data : aria.utils.Json.load(child.nodeValue, this, errorMessage),
						source : strValue
					}
				}
			}
			return null;

		},

		/**
		 * Process the XML document for this response
		 * @param {Object} xmlDocument document element from response
		 * @param {aria.modules.RequestBeans.Request} request
		 * @return {Object} processed data
		 */
		processXMLDocument : function (xmlDocument, request) {

			var extracted = {}, source = {};

			var ELEMENT_NODE = 1;
			var TEXT_NODE = 3;
			var CDATA_SECTION_NODE = 4;

			var childNodes = xmlDocument.childNodes;
			var length = childNodes.length;
			for (var i = 0; i < length; i++) {
				var node = childNodes[i];
				if (node.nodeType !== TEXT_NODE) {
					var name = node.tagName;
					if (name == 'framework' || name == 'data' || name == 'errors') {
						var extract = this._extractCDATAasJSON(node, this["JSON_ERROR_ON_" + name.toUpperCase()])
						extracted[name] = extract.data;
						source[name] = extract.source;
					}
				}
			}

			// process framework tag
			if (extracted.framework) {
				// update session info
				var newSessionInfo = extracted.framework.session, session = request.session;
				if (newSessionInfo) {
					// update the session information
					for (var key in newSessionInfo) {
						if (newSessionInfo.hasOwnProperty(key)) {
							session[key] = newSessionInfo[key];
						}
					}
				}
			}

			var res = {}, oSelf = this;
			res.response = extracted.data;

			// process errors tag
			if (extracted.errors) {
				res.errorData = extracted.errors;
				res.error = true;
			}

			return res;
		}
	}
});