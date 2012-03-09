/*
 * Copyright Amadeus
 */
/**
 * @class aria.widgets.form.TextField TextField widget
 * @extends aria.widgets.form.TextInput
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.form.TextField',
	$extends : 'aria.widgets.form.TextInput',
	$dependencies : ['aria.widgets.controllers.TextDataController'],
	/**
	 * TextField constructor
	 * @param {aria.widgets.CfgBeans.TextFieldCfg} cfg the widget configuration
	 * @param {aria.templates.TemplateCtxt} ctxt template context
	 */
	$constructor : function (cfg, ctxt, lineNumber) {
		var controller = new aria.widgets.controllers.TextDataController();

		this.$TextInput.constructor.call(this, cfg, ctxt, lineNumber, controller);

		// The following change was creating non regressions and has been removed
		// PTR 05282787 the onchange does not have to be called when going from null to ""
		// cfg.value = (cfg.value) ? cfg.value + "" : "";
	},
	$prototype : {
		/**
		 * Compare newValue with the one stored in _cfg[propertyName] 
		 * For a Textfield, undefined, null and an empty string are considered as equal.
		 * @param {String} propertyName
		 * @param {Multitype} newValue If transformation is used, this should be the widget value and not the data model
		 * value
		 * @private
		 * @return true if it is considered as equals.
		 */
		_isPropertyEquals : function (propertyName, newValue) {
			var oldValue = this.getProperty(propertyName) || "";
			return oldValue === (newValue || "");
		}

	}
});
