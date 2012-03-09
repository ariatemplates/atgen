/*
 * Copyright Amadeus
 */
/**
 * Class definition for the button widget.
 */
Aria.classDefinition({
	$classpath : "aria.widgets.action.IconButton",
	$extends : "aria.widgets.action.Button",
	$dependencies : ["aria.widgets.Icon"],
	/**
	 * ActionWidget constructor
	 * @param {aria.widgets.CfgBeans.ActionWidgetCfg} cfg the widget configuration
	 * @param {aria.templates.TemplateCtxt} ctxt template context
	 */
	$constructor : function (cfg, ctxt, lineNumber) {
		this.$Button.constructor.apply(this, arguments);

		/**
		 * Instance of the Icon widget used by this widget.
		 * @type aria.widgets.Icon
		 * @protected
		 */
		this._icon = new aria.widgets.Icon({
			icon : cfg.icon
		}, ctxt, lineNumber);
	},
	$destructor : function () {
		this._icon.$dispose();
		this.$Button.$destructor.call(this);
	},
	$prototype : {
		/**
		 * Overwrite the Button class content markup method to write the icon
		 * @param {aria.templates.MarkupWriter} out Markup writer
		 * @private
		 */
		_widgetMarkupContent : function (out) {
			this._icon.writeMarkup(out);
		}
	}
});