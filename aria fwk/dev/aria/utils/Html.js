/*
 * Copyright Amadeus
 */
/**
 * This class contains utilities to manipulate Html elements.
 */
Aria.classDefinition({
	$classpath : "aria.utils.Html",
	$extends : "aria.core.JsObject",
	$dependencies : ["aria.templates.DomElementWrapper", "aria.utils.String"],
	$singleton : true,
	$statics : {
		INVALID_CONFIGURATION : "Invalid attribute %1."
	},
	$prototype : {
		/**
		 * Build the HTML markup regarding the attributes provided.
		 * @param {HtmlAttribute} attributes Attributes to be parsed
		 * @return {String} String which can be used directly in a html tag
		 */
		buildAttributeList : function (attributes) {
			var result = [];

			/*
			 * This assumes that white list is performed by config validation, but this is only available in debug mode :
			 * FIXME!
			 */
			var stringUtil = aria.utils.String;
			for (var key in attributes) {
				if (attributes.hasOwnProperty(key)) {
					var attribute = attributes[key];
					if (key === "classList") {
						result.push(" class=\"");
						result.push(stringUtil.encodeForQuotedHTMLAttribute(attribute.join(" ")));
						result.push("\"");
					} else if (key === "dataset") {
						for (var dataKey in attribute) {
							if (attribute.hasOwnProperty(dataKey) && dataKey.substr(0, 5) != "data-") {
								result.push(" data-", dataKey, "=\"");
								result.push(stringUtil.encodeForQuotedHTMLAttribute(attribute[dataKey]));
								result.push("\"");
							}
						}
					} else if (aria.templates.DomElementWrapper.attributesWhiteList.test(key)) {
						result.push(" ", key, "=\"");
						result.push(stringUtil.encodeForQuotedHTMLAttribute(attribute));
						result.push("\"");
					} else {
						this.$logError(this.INVALID_CONFIGURATION, key);
					}
				}
			}
			return result.join('');
		}
	}
});