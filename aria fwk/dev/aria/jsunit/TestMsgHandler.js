/*
 * Copyright Amadeus
 */
(function () {

	var index = 0;

	/**
	 * This class implements a message handler for the ModuleCtrlTestCase class. It intercepts and logs connection
	 * requests and responses
	 */
	Aria.classDefinition({
		$classpath : 'aria.jsunit.TestMsgHandler',
		$extends : 'aria.core.IOFilter',
		$dependencies : ['aria.jsunit.ConnectionSession'],
		/**
		 * This function initializes the filter so that the module controller which is using it can access its data
		 * structures
		 * @param {Object} mctrl the Module Controller object which is using the filter
		 */
		$constructor : function (mctrl) {
			this.$IOFilter.constructor.call(this);
			// use an index so that everything works well in case there are several TestMsgHanlders registered
			this._metaData = this.CONNECTION_SESSION_METADATA + index;
			index++;
			this.cxLogs = [];
			mctrl.cxLogs = this.cxLogs;
		},
		$destructor : function () {
			this.cxLogs = null;
			this.$IOFilter.$destructor.call(this);
		},
		$statics : {
			CONNECTION_SESSION_METADATA : "aria.jsunit.TestMsgHandler:connectionSession"
		},
		$prototype : {

			onRequest : function (req) {
				var sender = req.sender;
				if (sender && sender.classpath == "aria.modules.RequestMgr") {
					this.$assert(38, sender[this._metaData] == null);
					var connectionSession = new aria.jsunit.ConnectionSession({
						ioRequest : req
					});
					sender[this._metaData] = connectionSession;
					this.cxLogs.push(connectionSession);
				}
			},

			onResponse : function (req) {
				var sender = req.sender;
				if (sender) {
					var connectionSession = sender[this._metaData];
					if (connectionSession) {
						connectionSession.setIOResponse();
					}
				}
			}
		}
	});
})();
