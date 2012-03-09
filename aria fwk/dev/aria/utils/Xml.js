/*
 * Copyright Amadeus
 */
/**
 * @class aria.utils.Xml Utilities for manipulating xml content
 * @extends aria.core.JsObject
 * @singleton
 */
Aria.classDefinition({
	$classpath : 'aria.utils.Xml',
	$singleton : true,
	$constructor : function () {},
	$prototype : {

		/**
		 * Performs a lossy conversion of a Xml string to a Json object Node atrributes are omitted in the parsing
		 * process
		 * @param {String} str The content of the Xml document
		 * @return {Object} Json represantation of the Xml content
		 */
		convertXmlToJson : function (str) {
			var xmlDoc;
			var DOMParser = Aria.$global.DOMParser;
			if (DOMParser) {
				var parser = new DOMParser();
				xmlDoc = parser.parseFromString(str, "text/xml");
			} else { // Internet Explorer
				var ActiveXObject = Aria.$global.ActiveXObject;
				xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async = "false";
				xmlDoc.loadXML(str);
			}

			if (xmlDoc.hasChildNodes()) {
				return this.__parseXmlNode(xmlDoc);
			} else {
				return null;
			}
		},
		/**
		 * Internal method used for parsing the nodes of a xml document
		 * @param {XmlNode} xmlNode Xml node to be parsed
		 * @return {Object} Json object representing a xml node
		 */
		__parseXmlNode : function (xmlNode) {
			if (!xmlNode) {
				return;
			}
			var node = {};
			for (var i = 0; i < xmlNode.childNodes.length; i++) {
				var currNode = xmlNode.childNodes[i];

				// if it's a text node or a CDATA section use the nodeValue directly
				if (currNode.nodeType != 3 && currNode.nodeType != 4) {
					var name = currNode.nodeName;
					var count = 0;
					for (var j = 0; j < xmlNode.childNodes.length; j++) {
						if (xmlNode.childNodes[j].nodeName == name) {
							if (++count == 2) {
								break;
							}
						}
					}
					var el = this.__parseXmlNode(currNode);
					if (count == 2) {
						if (node[name] == null) {
							node[name] = [];
						}
						node[name].push(el);
					} else {
						node[name] = el;
					}

				} else if (xmlNode.childNodes.length == 1) {
					node = currNode.nodeValue;
				}
			}
			return node;
		}
	}
});
