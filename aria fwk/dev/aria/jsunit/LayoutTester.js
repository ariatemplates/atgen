/*
 * Copyright Amadeus
 */
Aria.classDefinition({
	$classpath : 'aria.jsunit.LayoutTester',
	$singleton : true,
	$statics : {
		excludeRegExp : /"^(script|noscript|style|option)$"/gi
	},
	$constructor : function () {
		this.elements = [];
	},
	$prototype : {

		/**
		 * Captures the dom elements information of the root children elements (including the root). These properties
		 * are stored for each node : id, tagName, top, left, width, height and text.
		 * @param {HtmlElement} root The root node.
		 */
		captureJsonScreenshot : function (root) {
			this.elements = [];
			if (!root) {
				root = Aria.$window.document.body;
			}
			this._captureJsonScreenshot(root);
			return this.elements;
		},
		/**
		 * Recursive method of captureJsonScreenshot
		 * @param {HtmlElement} root The root node.
		 * @private
		 */
		_captureJsonScreenshot : function (root) {
			var excludeRegExp = this.excludeRegExp;
			var children = root.childNodes;
			for (var i = 0, ii = children.length; i < ii; i++) {
				var child = children[i];
				if (child.tagName && !excludeRegExp.test(child.tagName)) {
					if (this._isHumanVisible(child)) {
						this._saveElement(child);
					}
					this._captureJsonScreenshot(child);
				}
			}
		},
		/**
		 * Convenient method to compare an old json with the last capture
		 * @param {Array} arrayToCompare The array to be compared.
		 * @return An array with messages about differences found. If no difference is found, an empty array is
		 * returned.
		 */
		compare : function (arrayToCompare) {

			if (!arrayToCompare) {
				return ["Array to compare is null"];
			}

			var json = aria.utils.Json;
			var result = [];
			var ref = this.elements;
			if (arrayToCompare.length != ref.length) {
				result.push("The items number is not the same");
				for (var i = 0, ii = ref.length; i < ii; i++) {
					if (!arrayToCompare[i] || !json.equals(ref[i], arrayToCompare[i])) {
						result.push("Different from item " + i);
						break;
					}
				}
				return result;
			}

			// From here, both length array are equals
			for (var i = 0, ii = ref.length; i < ii; i++) {
				if (!arrayToCompare[i] || !json.equals(ref[i], arrayToCompare[i])) {
					result.push("Item " + i + " is different");
				}
			}
			return result;

		},
		/**
		 * Stores the json of a dom element.
		 * @param {HtmlElement} el The element to store
		 * @private
		 */
		_saveElement : function (el) {
			var coords = this._getCoordinates(el);
			var text = this._getDirectTextContent(el);
			this.elements.push({
				id : el.id,
				tagName : el.tagName,
				top : coords.top,
				left : coords.left,
				width : coords.width,
				height : coords.height,
				text : text
			});
		},
		/**
		 * Returns true if the element is visible
		 * @param {HtmlElement} el The element to test
		 * @return true if the element is visible
		 * @private
		 */
		_isHumanVisible : function (el) {
			// If it's an image, directly return true
			if (el.tagName.toLowerCase() == "img") {
				return true;
			}
			// If it's invisible via CSS, directly return false
			if (el.style.display == "none" || el.style.visibility == "hidden") {
				return false;
			}
			// If it's too small to be seen, return false
			var coords = this._getCoordinates(el);
			if (coords.width == 0 && coords.height == 0) {
				return false;
			}
			// If it contains text as the first child, directly return true
			if (this._hasDirectChildText(el)) {
				return true;
			}
			// Otherwise, check if it has a border or background
			return this._hasStyleThatMakesItVisible(el);
		},
		/**
		 * Returns true if the element has a text value
		 * @param {HtmlElement} el The element to test
		 * @return true if the element has a text value
		 * @private
		 */
		_hasDirectChildText : function (el) {
			return this._getDirectTextContent(el) != "";
		},
		/**
		 * Returns true if the element is visible, regarding some properties as the border, the background, ...
		 * @param {HtmlElement} el The element to test
		 * @return true if the element is visible.
		 * @private
		 */
		_hasStyleThatMakesItVisible : function (el) {
			// var getComputedStyle = document.defaultView.getComputedStyle;

			var computedStyle = el.currentStyle || el.ownerDocument.defaultView.getComputedStyle(el);

			return (computedStyle.border != "" || computedStyle.borderWidth != "" || computedStyle.borderTopWidth != ""
					|| computedStyle.borderLeftWidth != "" || computedStyle.borderBottomWidth != ""
					|| computedStyle.borderRightWidth != ""
					|| (computedStyle.background != "" && computedStyle.background != "none")
					|| (computedStyle.backgroundImage != "" && computedStyle.backgroundImage != "none") || (computedStyle.backgroundColor != "" && computedStyle.backgroundColor != "transparent"));
		},
		/**
		 * Returns the coordinates of the dom element
		 * @param {HtmlElement} el Dom element
		 * @return coordinates object
		 * @private
		 */
		_getCoordinates : function (el) {
			var clientRect = el.getBoundingClientRect();
			// clientRect is readonly, and width/height are not in ie

			// Math.round : to have the same result with all browsers:
			var coordinates = {};
			coordinates.top = Math.round(clientRect.top);
			coordinates.left = Math.round(clientRect.left);
			coordinates.width = Math.round(clientRect.width || el.offsetWidth);
			coordinates.height = Math.round(clientRect.height || el.offsetHeight);

			return coordinates;
		},
		/**
		 * Returns the text content of a dom element
		 * @param {HtmlElement} el Dom element
		 * @return The text content
		 * @private
		 */
		_getDirectTextContent : function (el) {
			if (el.tagName.toLowerCase() == "input" && el.getAttribute("type") == "text") {
				return el.value;
			}
			var children = el.childNodes;
			var str = "";
			for (var i = 0, ii = children.length; i < ii; i++) {
				var child = children[i];
				if (child.nodeType == 3) {
					var text = child.textContent || child.innerText || child.nodeValue;
					if (text) {
						text = text.replace(/(\r\n|[\r\n])/g, "").replace(new RegExp(String.fromCharCode(160), "g"), " ").replace(/^\s+|\s+$/g, "");
						if (text != "") {
							str += text;
						}
					}
				}
			}
			return str;
		}

	}
});