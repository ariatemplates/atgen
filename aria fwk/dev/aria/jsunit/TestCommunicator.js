/*
 * Copyright Amadeus
 */
/**
 * TestCommunicator is a DOM element that will be used to communicated with the test shell (for instance selenium).<br />
 * A TestCommunicator is defined by a contract made of the HTML id (which is expected by the shell) and the content
 * (only certain values might be accepted for instance)
 */
Aria.classDefinition({
	$classpath : "aria.jsunit.TestCommunicator",
	$constructor : function (conf) {
		/**
		 * The HTML id to use for the communicator
		 * @type String
		 */
		this.id = conf.id;

		/**
		 * Text content that will be inserted inside the communicator
		 * @type String
		 */
		this.content = "";

		this.init(conf);
	},
	$destructor : function () {
		// Empty because we didn't call the JsObject constructor
	},
	$prototype : {
		/**
		 * @private
		 */
		init : function (conf) {
			var document = Aria.$window.document;
			var domElement = document.createElement("div");

			// Hide the element while still allowing for webdriver to retrieve it
			domElement.style.cssText = ["display:block", "visibility:visible", "height:1px", "width:1px",
					"overflow:hidden"].join(";");

			domElement.id = this.id;
			document.body.appendChild(domElement);

			var content = conf.content;
			this.content = content;

			// Insert the content as textContent/innerText to avoid interpretation
			domElement.appendChild(document.createTextNode(content));
		}
	}
});