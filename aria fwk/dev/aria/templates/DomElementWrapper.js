/*
 * Copyright Amadeus
 */
/**
 * Wrapper for DOM elements inside templates (so that the templates do not have a direct access to the DOM).
 * @class aria.templates.DomElementWrapper
 */
Aria.classDefinition({
	$classpath : 'aria.templates.DomElementWrapper',
	$dependencies : ['aria.utils.Dom', 'aria.utils.DomOverlay', 'aria.utils.ClassList'],
	/**
	 * Create a DOM Wrapper object to allow safe changes in the DOM without giving direct access to the DOM. Note that a
	 * closure is used to prevent access to the domElt object from the template.
	 * @param {HTMLElement} domElt DOM element which is wrapped
	 */
	$constructor : function (domElt, tplCtxt) {

		if (domElt && domElt.nodeType) {
			while (domElt.nodeType != 1) {
				domElt = domElt.parentNode;
			}
		}

		// TODO: add a check that domElt is not part of a widget

		/**
		 * Tag name
		 * @type {String}
		 */
		var tagName = domElt.tagName;

		this.tagName = tagName;

		// all the functions are defined in the constructor to be sure that the user cannot access domElt
		// in any case. domElt only exists in this scope and cannot be accessed from outside.
		// THIS COULD BE CHANGED

		// DO NOT FORGET TO UPDATE JSDOC IN THE PROTOTYPE if changing the signature or behavior of the methods here.

		this.getChild = function (childIndex) {
			var oElm = aria.utils.Dom.getDomElementChild(domElt, childIndex);
			return (oElm) ? new aria.templates.DomElementWrapper(oElm) : null;
		};

		this.getAttribute = function (attributeName) {

			/*
			 * This white list check should be done with aria.templates.CfgBeans.HtmlAttribute, except dataset and
			 * classList. But the jsonvalidator validate beans only in debug mode. Right now there is code duplication :
			 * This must be solved .
			 */
			if (!this.attributesWhiteList.test(attributeName)) {
				// don't allow access to incorrect expando names
				this.$logError(this.INVALID_ATTRIBUTE_NAME, [attributeName]);
				return null;
			}

			var attribute = domElt.attributes[attributeName];
			return (attribute ? attribute.value : null);
		};

		this.getData = function (dataName, checkAncestors) {
			if (!/^\w+$/.test(dataName) || dataName.charAt(0) == '_') {
				// don't allow access to incorrect expando names
				this.$logError(this.INVALID_EXPANDO_NAME, [dataName]);
				return null;
			}
			// expandoKey is deprecated. To be removed.
			var expandoKey = '_' + dataName;
			var dataKey = 'data-' + dataName;
			var attribute = domElt.attributes[expandoKey] || domElt.attributes[dataKey];
			if (domElt.attributes[expandoKey] != null) {
				this.$logWarn("The '_' usage is deprecated for the expando %1, please use the dataset html attribute instead.", [expandoKey]);
			}
			if (!attribute && checkAncestors) {
				var parent = domElt.parentNode;
				while (!attribute && parent != null && parent.attributes != null) {
					attribute = parent.attributes[expandoKey] || parent.attributes[dataKey];
					if (domElt.attributes[expandoKey] != null) {
						this.$logWarn("The '_' usage is deprecated for the expando %1, please use the dataset html attribute instead.", [expandoKey]);
					}
					parent = parent.parentNode;
				}
			}
			return (attribute ? attribute.value : null);
		};

		this.getExpando = function (expandoName, checkAncestors) {
			this.$logWarn("getExpando is deprecated, please use the getData instead.");
			return this.getData(expandoName, checkAncestors);
		};

		/**
		 * @type aria.utils.ClassList Wrapper to manage classes for DOM elements inside templates
		 */
		this.classList = new aria.utils.ClassList(domElt);

		this.setClassName = function (className) {
			this.$logWarn("setClassName is deprecated, please use the classList.setClassName instead.");
			this.classList.setClassName(className);
		};

		this.getClassName = function () {
			this.$logWarn("getClassName is deprecated, please use the classList.getClassName instead.");
			return this.classList.getClassName();
		};

		this.focus = function () {
			try {
				return domElt.focus();
			} catch (e) {
				this.$logDebug(this.FOCUS_FAILURE, domElt);
			}
		};

		this.setStyle = function (style) {
			domElt.style.cssText = style;
		};

		this.getValue = function () {
			if (tagName == "TEXTAREA" || tagName == "INPUT" || tagName == "SELECT") {
				return domElt.value;
			}
		};

		this.setValue = function (value) {
			if (tagName == "TEXTAREA" || tagName == "INPUT" || tagName == "SELECT") {
				domElt.value = value;
			}
		};

		this._dispose = function () {
			this.setProcessingIndicator(false);
			domElt = null;
			tplCtxt = null;
			this.getChild = null;
			this.classList.$dispose();
			this.getData = null;
			this.getExpando = null;
			this.setClassName = null;
			this.getClassName = null;
			this.focus = null;
			this.setStyle = null;
			this.getValue = null;
			this.setValue = null;
			this.getParentWithName = null;
			this.setProcessingIndicator = null;
		};

		this.getParentWithName = function (nodeName) {
			if (!nodeName || !domElt) {
				return null;
			}
			var body = Aria.$window.document.body;
			nodeName = nodeName.toUpperCase();
			var parent = domElt.parentNode;
			while (parent && parent != body) {
				if (parent.nodeName == nodeName) {
					return new aria.templates.DomElementWrapper(parent);
				}
				parent = parent.parentNode;
			}
			return null;
		};

		this.setProcessingIndicator = function (visible, message) {
			var overlay, doRegistration = true;
			if (visible) {
				overlay = aria.utils.DomOverlay.create(domElt, message);
			} else {
				overlay = aria.utils.DomOverlay.detachFrom(domElt, message);

				if (!overlay) {
					// Trying to remove an overlay from an element that has no overlay attached
					doRegistration = false;
				}
			}

			// Notify the template context
			if (tplCtxt && doRegistration) {
				tplCtxt.registerProcessingIndicator(visible, overlay);
			}
		};

		this.scrollIntoView = function (alignTop) {
			aria.utils.Dom.scrollIntoView(domElt, alignTop);
		};

		this.getScroll = function () {
			return {
				scrollLeft : domElt.scrollLeft,
				scrollTop : domElt.scrollTop
			};
		};

		this.setScroll = function (scrollPositions) {
			if (scrollPositions) {
				if (scrollPositions.hasOwnProperty('scrollLeft') && scrollPositions.scrollLeft != null) {
					domElt.scrollLeft = scrollPositions.scrollLeft;
				}
				if (scrollPositions.hasOwnProperty('scrollTop') && scrollPositions.scrollTop != null) {
					domElt.scrollTop = scrollPositions.scrollTop;
				}
			}
		};
	},
	$destructor : function () {
		if (this._dispose) {
			this._dispose();
			this._dispose = null;
		}
	},
	$statics : {

		attributesWhiteList : /^(name|title|style|dir|lang|abbr|height|width|size|cols|rows|rowspan|colspan|nowrap|valign|align|border|cellpadding|cellspacing|disabled|readonly|checked|selected|multiple|value|alt|maxlength|type)$/,

		// ERROR MESSAGE:
		INVALID_EXPANDO_NAME : "Invalid expando name: '%1'.",
		INVALID_ATTRIBUTE_NAME : "Invalid attribute name: '%1'.",
		FOCUS_FAILURE : "Could not focus element"
	},
	$prototype : {

		// Empty functions are defined in the prototype to have JsDoc correctly generated.

		/**
		 * Get a wrapper on a child element of this node. When the wrapper is not needed anymore, it must be disposed
		 * with its $dispose method.
		 * @param {Number} childIndex
		 * @return A wrapper on the child element, if the child element exists, or null if it does not exist.
		 */
		getChild : function (childIndex) {},

		/**
		 * Get the html attribute of the dom element
		 * @param {String} attributeName Attribute name to retrieve
		 * @return {String} The attribute value
		 */
		getAttribute : function (attributeName) {},

		/**
		 * Get a data value. An expando called "myExpando" can be declared in the HTML code this way: <div
		 * data-myExpando = "myExpandoValue" >
		 * @param {String} expandoName name of the expando.
		 * @param {Boolean} checkAncestors if the expando is not found on the element, look on its ancestors
		 */
		getData : function (dataName, checkAncestors) {},

		/**
		 * deprecated, use getData instead
		 * @deprecated
		 */
		getExpando : function (expandoName, checkAncestors) {},

		/**
		 * Deprecated, please use the classList.setClassName instead.
		 */
		setClassName : function (className) {},

		/**
		 * Deprecated, please use the classList.getClassName instead.
		 */
		getClassName : function () {},

		/**
		 * Set focus on dom element.
		 */
		focus : function () {},

		/**
		 * Set inline style for this element.
		 * @param {String} style
		 */
		setStyle : function (style) {},

		/**
		 * Return value property of DOM node.
		 * @return {String}
		 */
		getValue : function () {},

		/**
		 * Set the value property of DOM node
		 * @param {String} value
		 */
		setValue : function (value) {},

		/**
		 * Clean the variables inside the closure.
		 * @private
		 */
		_dispose : function () {},

		/**
		 * Get parent from dom element with given name
		 * @param {String} nodeName
		 * @return {aria.templates.DomElementWrapper}
		 */
		getParentWithName : function (nodeName) {},

		/**
		 * Set the state of the processing indicator
		 * @param {Boolean} visible True if the loading indicator should be visible
		 * @param {String} message Text message to display inside the loading indicator
		 */
		setProcessingIndicator : function (visible, message) {},

		/**
		 * Scroll containers to make the element visible
		 * @param {Boolean} alignTop if true, try to make the element top aligned with the top of its container. If
		 * false, try to align with bottom. Otherwise, just perform minimal scroll.
		 */
		scrollIntoView : function (alignTop) {},

		/**
		 * Return the scroll positions of the dom element
		 * @return {Object} scrollLeft and scrollTop of the dom element
		 */
		getScroll : function () {},

		/**
		 * Set the scroll positions of the dom element
		 * @param {Object} desired scrollLeft and scrollTop
		 */
		setScroll : function (scrollPositions) {}
	}
});