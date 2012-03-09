/*
 * Copyright Amadeus
 */
/**
 * @class aria.core.log.SilentArrayAppender This appender is simply stacking all messages in a in-memory array. It is
 * used by the jsUnit test framework to assert the existence of logs during the execution of a test.
 */
Aria.classDefinition({
	$classpath : 'aria.core.log.SilentArrayAppender',
	$constructor : function () {
		/**
		 * The stack of logs
		 * @type Array
		 */
		this.logs = [];
	},
	$destructor : function () {
		this.logs = [];
	},
	$prototype : {
		isEmpty : function () {
			return this.logs.length == 0;
		},

		empty : function () {
			this.logs = [];
		},

		getLogs : function () {
			return this.logs;
		},

		setLogs : function (l) {
			this.logs = l;
		},

		_saveLog : function (l) {
			this.logs.push(l);
		},

		/**
		 * Debug
		 * @param {String} className
		 * @param {String} msg The message text (including arguments)
		 * @param {String} msgText The message text (before arguments were replaced)
		 * @param {Object} o An optional object to be inspected
		 */
		debug : function (className, msg, msgText, o) {
			this._saveLog({
				level : "debug",
				msg : msg,
				className : className,
				msgId : msgText,
				objOrErr : o
			});
		},

		/**
		 * Info
		 * @param {String} className
		 * @param {String} msg The message text (including arguments)
		 * @param {String} msgText The message text (before arguments were replaced)
		 * @param {Object} o An optional object to be inspected
		 */
		info : function (className, msg, msgText, o) {
			this._saveLog({
				level : "info",
				msg : msg,
				className : className,
				msgId : msgText,
				objOrErr : o
			});
		},

		/**
		 * Warn
		 * @param {String} className
		 * @param {String} msg The message text (including arguments)
		 * @param {String} msgText The message text (before arguments were replaced)
		 * @param {Object} o An optional object to be inspected
		 */
		warn : function (className, msg, msgText, o) {
			this._saveLog({
				level : "warn",
				msg : msg,
				className : className,
				msgId : msgText,
				objOrErr : o
			});
		},

		/**
		 * Error
		 * @param {String} className
		 * @param {String} msg The message text (including arguments)
		 * @param {String} msgText The message text (before arguments were replaced)
		 * @param {Object} e The exception to format
		 */
		error : function (className, msg, msgText, e) {
			this._saveLog({
				level : "error",
				msg : msg,
				className : className,
				msgId : msgText,
				objOrErr : e
			});
		}
	}
});