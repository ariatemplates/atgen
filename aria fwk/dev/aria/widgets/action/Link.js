/*
 * Copyright Amadeus
 */
/**
 * Class definition for the link widget.
 * @class aria.widgets.action.Link
 * @extends aria.widgets.action.ActionWidget
 */
Aria.classDefinition({
	$classpath : "aria.widgets.action.Link",
	$extends : "aria.widgets.action.ActionWidget",
	$dependencies : ["aria.utils.String"],
	$css : ["aria.widgets.css." + aria.widgets.AriaSkinInterface.getSkinName() + ".Link"],
	/**
	 * ActionWidget constructor
	 * @param {aria.widgets.CfgBeans.ActionWidgetCfg} cfg the widget configuration
	 * @param {aria.templates.TemplateCtxt} ctxt template context
	 */
	$constructor : function (cfg, ctxt) {
		this.$ActionWidget.constructor.apply(this, arguments);
		this._pressed = false;
		this._customTabIndexProvided = true;
		/**
		 * Tells if a key down event happened before the last click event. This prevents an enter event to fire the
		 * action twice.
		 * @protected
		 * @type Boolean
		 */
		this._keyPressed = false;

	},
	$prototype : {
		/**
		 * Generate the internal widget markup
		 * @param {aria.templates.MarkupWriter} out Markup Writer
		 * @protected
		 */
		_widgetMarkup : function (out) {
			var cfg = this._cfg;
			if (cfg.color) {
				// Todo: remove this temporary backward compatible fix:
				this.$logWarn(this.WIDGET_PROPERTY_DEPRECIATION, ['color']);
			}
			out.write(['<a', Aria.testMode ? ' id="' + this._domId + '_link"' : '', ' class="xLink_', cfg.sclass,
					'" href="javascript:(function(){})()"',
					(cfg.tabIndex != null ? ' tabindex=' + this._calculateTabIndex() + '"' : ''), '>',
					aria.utils.String.escapeHTML(cfg.label), '</a>'].join(''));
			cfg = null;
		},

		/**
		 * Called when a new instance is initialized
		 * @protected
		 */
		_init : function () {
			this._focusElt = this.getDom().firstChild;
			this.$ActionWidget._init.call(this);
		},

		/**
		 * React to delegated key down events
		 * @protected
		 * @param {aria.DomEvent} domEvt Event
		 */
		_dom_onkeydown : function (domEvt) {
			if (domEvt.keyCode == aria.DomEvent.KC_ENTER) {
				this._keyPressed = true;

				domEvt.stopPropagation();
				return false;
			}
			return true;
		},

		/**
		 * The method called when the markup is clicked
		 * @param {aria.DomEvent} evt
		 * @private
		 */
		_dom_onclick : function (domEvent) {
			// Otherwise we will leave the application
			domEvent.preventDefault();
			if (this._keyPressed) {
				this._keyPressed = false;
				return false;
			} else {
				return this.$ActionWidget._dom_onclick.apply(this, arguments);
			}
		},

		/**
		 * React to delegated key up events
		 * @protected
		 * @param {aria.DomEvent} domEvt Event
		 */
		_dom_onkeyup : function (domEvt) {
			if (domEvt.keyCode == aria.DomEvent.KC_ENTER) {

				if (!this._performAction(domEvt)) {
					domEvt.stopPropagation();
					return false;
				}
				return true;
			}
			return true;
		}
	}
});