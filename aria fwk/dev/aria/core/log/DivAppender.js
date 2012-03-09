/*
 * Copyright Amadeus
 */
/**
 * This appender output logs to a div in simple HTML format.
 * @class aria.core.log.DivAppender
 */
Aria.classDefinition({
	$classpath : 'aria.core.log.DivAppender',
	/**
	 * Takes the div used for logs as argument
	 * @param {HTMLElement} div
	 */
	$constructor : function (div) {
		this.div = div;
		div.innerHTML = '<h2>Logs</h2>';
		this.groupSpacer = "";
	},
	$destructor : function () {
		this.div = null;
	},
	$prototype : {
		/**
		 * Inspect an object in a log
		 * @param {Object} o the object to inspect
		 * @private
		 */
		_inspectObject : function (o) {
			var str = "";
			if (o && typeof o == "object") {
				str += "<blockquote>";
				for (var i in o) {
					if (typeof o[i] !== "function") {
						str += i + " > " + o[i] + "<br />";
					}
				}
				str += "</blockquote>";
			}
			return str;
		},

		/**
		 * The message may contain HTML or XML tags which won't be shown in the page because they will be parsed by the
		 * browser. Need to escape these ones
		 * @private
		 * @param {String} msg The message to be parsed
		 * @return {String} The parsed message
		 */
		_escapeHTML : function (msg) {
			return msg.replace(/</g, "&lt;");
		},

		/**
		 * Show a visual separator to better visualize logs
		 */
		_showSeparator : function () {},

		/**
		 * Debug
		 * @param {String} className
		 * @param {String} msg The message text (including arguments)
		 * @param {String} msgText The message text (before arguments were replaced)
		 * @param {Object} o An optional object to be inspected
		 */
		debug : function (className, msg, msgText, o) {
			this._showSeparator();
			this._write("<p>DEBUG</p><p>" + this.groupSpacer + "<em>" + className + "</em> " + this._escapeHTML(msg)
					+ "</p>");
			this._write(this._inspectObject(o));
			this._scrollDown();
		},

		/**
		 * Info
		 * @param {String} className
		 * @param {String} msg The message text (including arguments)
		 * @param {String} msgText The message text (before arguments were replaced)
		 * @param {Object} o An optional object to be inspected
		 */
		info : function (className, msg, msgText, o) {
			this._showSeparator();
			this._write("<p style='background-color:#ECEFF4;'>INFO</p><p>" + this.groupSpacer + "<em>" + className
					+ "</em> " + this._escapeHTML(msg) + "</p>");
			this._write(this._inspectObject(o));
			this._scrollDown();
		},

		/**
		 * Warn
		 * @param {String} className
		 * @param {String} msg The message text (including arguments)
		 * @param {String} msgText The message text (before arguments were replaced)
		 * @param {Object} o An optional object to be inspected
		 */
		warn : function (className, msg, msgText, o) {
			this._showSeparator();
			this._write("<p style='background-color:orange;'>WARN</p><p>" + this.groupSpacer + "<em>" + className
					+ "</em> " + this._escapeHTML(msg) + "</p>");
			this._write(this._inspectObject(o));
			this._scrollDown();
		},

		/**
		 * Error
		 * @param {String} className
		 * @param {String} msg The message text (including arguments)
		 * @param {String} msgText The message text (before arguments were replaced)
		 * @param {Object} e The exception to format
		 */
		error : function (className, msg, msgText, e) {
			this._showSeparator();
			this._write("<p style='background-color:red;'>ERROR</p><p>" + this.groupSpacer + "<em>" + className
					+ "</em> " + this._escapeHTML(msg) + "</p>");
			this._write(this._inspectObject(e));
			this._scrollDown();
		},

		/**
		 * @private
		 */
		_scrollDown : function () {
			this.div.style.scrollTop = 10000000;
		},

		/**
		 * Write something in the log container
		 */
		_write : function (txt) {
			this.div.innerHTML += txt;
		}
	}
});