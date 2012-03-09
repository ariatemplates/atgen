/*
 * Copyright Amadeus
 */
/**
 * Transport class for Local requests. It extends from aria.core.transport.XHR and redefines some methods to work with
 * file: protocol. Being a singleton the extension is not done through $extends
 * @class aria.core.transport.Local
 * @extends aria.core.JsObject
 * @singleton
 */
Aria.classDefinition({
	$classpath : "aria.core.transport.Local",
	$singleton : true,
	$extends : "aria.core.transport.BaseXHR",
	$constructor : function () {
		this.$BaseXHR.constructor.call(this);
	},
	$prototype : {
		/**
		 * Perform a request.
		 * @param {String} reqId Request identifier
		 * @return {Object} connection object
		 * @throws
		 * @override
		 */
		request : function (reqId) {
			if (aria.core.Browser.isOpera) {
				// Opera doesn't work with file protocol but the iFrameHack seems to work
				return this._iFrameHack(reqId);
			}

			this.$BaseXHR.request.call(this, reqId);
		},

		/**
		 * Use an iFrame to load the content of a request. This raises a security error on most of the browsers except
		 * Opera (desktop and mobile). It's ugly but it works.
		 * @param {String} reqId Request identifier
		 */
		_iFrameHack : function (reqId) {
			var params = this._requestParams[reqId];
			this.$assert(56, !!params);
			delete this._requestParams[reqId];

			var document = Aria.$frameworkWindow.document;
			var iFrame = document.createElement("iframe");
			iFrame.src = params.uri;
			iFrame.id = "xIFrame" + params.reqId;
			iFrame.style.cssText = "display:none";

			// Event handlers
			iFrame.onload = iFrame.onreadystatechange = function (event, isAbort) {
				if (isAbort || !iFrame.readyState || /loaded|complete/.test(iFrame.readyState)) {
					// Memory leak
					iFrame.onload = iFrame.onreadystatechange = null;

					var text;
					if (iFrame.contentDocument) {
						text = iFrame.contentDocument.getElementsByTagName('body')[0].innerText;
					} else if (iFrame.contentWindow) {
						text = iFrame.contentWindow.document.getElementsByTagName('body')[0].innerText;
					}

					// Remove the iframe
					if (iFrame.parentNode) {
						document.body.removeChild(iFrame);
					}

					iFrame = undefined;

					// Callback if not abort
					aria.core.IO._handleTransactionResponse({
						conn : {
							status : 0,
							responseText : text,
							getAllResponseHeaders : function () {}
						},
						transaction : params.reqId
					}, params.callback, isAbort);
				}
			};

			document.body.appendChild(iFrame);
		},

		/**
		 * Get a connection object. For the local transport we prefer to get ActiveXObject because it allows to make
		 * requests on IE.
		 * @return {Object} connection object
		 * @protected
		 * @override
		 */
		_getConnection : function () {
			return this._activeX() || this._standardXHR();
		}
	}
});