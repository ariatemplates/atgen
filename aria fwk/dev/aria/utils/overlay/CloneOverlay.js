/*
 * Copyright Amadeus
 */
/**
 * This class creates an overlay cloning the HTML element and keeps it positioned above a given HTML element
 */
Aria.classDefinition({
	$classpath : "aria.utils.overlay.CloneOverlay",
	$extends : "aria.utils.overlay.Overlay",
	$dependencies : ["aria.utils.Dom"],
	$constructor : function (element, params) {

		/**
		 * Original element
		 * @type HTMLElement
		 * @private
		 */
		this._originalElement = element;

		/**
		 * Clone of the original element
		 * @type HTMLElement
		 * @private
		 */
		this.__clone = element.cloneNode(true);

		this.$Overlay.constructor.call(this, this.__clone, params);
	},
	$destructor : function () {
		this._originalElement = null;
		this.__clone = null;
		this.$Overlay.$destructor.call(this);
	},
	$prototype : {

		/**
		 * Creates DIV element to act as the overlay
		 * @param {Object} params Configuration object
		 * @return {HTMLElement}
		 * @protected
		 * @override
		 */
		_createOverlay : function (params) {

			var overlay = this.$Overlay._createOverlay(params);

			var clone = this.__clone;
			var opacity = ("opacity" in params) ? params.opacity : 0.5;
			aria.utils.Dom.setOpacity(clone, opacity);

			return clone;
		},

		/**
		 * Calculate the Geometry/Position for the overlay
		 * @param {HTMLElement} element DOM element to apply the overlay
		 * @param {HTMLElement} overlay DOM element of the overlay
		 * @protected
		 */
		_setInPosition : function (element, overlay) {
			var overlayStyle = overlay.style;
			overlayStyle.position = "absolute";
			overlayStyle.top = element.offsetTop + "px";
			overlayStyle.left = element.offsetLeft + "px";
			overlayStyle.display = "block";
		},

		/**
		 * Appends Overlay to DOM. The overlay is added as a sibling of the element to which it is associated
		 * @param {HTMLElement} overlay Overlay element
		 * @protected
		 */
		_appendToDOM : function (overlay) {
			// var parent = aria.utils.Dom.getElementById(this.element.id).parentNode;
			// parent.appendChild(overlay);
			this._originalElement.parentNode.appendChild(overlay);
		}
	}
});