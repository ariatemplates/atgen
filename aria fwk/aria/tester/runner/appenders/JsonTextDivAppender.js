/*
 * Copyright Amadeus
 */
// Appenders should implement an interface
// And the type of the <report> object passed to the append method should be documented in a bean
// For now, we only have one appender anyway

/**
 * Appender that will output the report as a JSON string inside a hidden DIV so that browser drivers such as Selenium
 * can retrieve it
 */
Aria.classDefinition({
	$classpath : "aria.tester.runner.appenders.JsonTextDivAppender",
	$dependencies : ['aria.utils.Dom', 'aria.utils.Json'],
	$statics : {
		REPORT_DIV_ID : 'testReport'
	},
	$prototype : {
		_destroyReportDiv : function () {
			var div = aria.utils.Dom.getElementById(this.REPORT_DIV_ID);
			if (div) {
				div.parentNode.removeChild(div);
			}
		},
		_createReportDiv : function (content) {
			var div = aria.utils.Dom.getElementById(this.REPORT_DIV_ID);
			if (!div) {
				div = document.createElement("DIV");
				div.id = this.REPORT_DIV_ID;
				div.style.display = "none";
				div.innerHTML = content;
				document.body.appendChild(div);
			}
		},
		/**
		 * Append the report
		 * @param {Object} report
		 */
		append : function (report) {
			this._destroyReportDiv();
			this._createReportDiv(aria.utils.Json.convertToJsonString(report));
		}
	}
});
