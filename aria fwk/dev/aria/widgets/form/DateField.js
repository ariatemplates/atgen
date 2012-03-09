/*
 * Copyright Amadeus
 */
/**
 * @class aria.widgets.form.DateField Datefield widget
 * @extends aria.widgets.form.TextInput
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.form.DateField',
	$extends : 'aria.widgets.form.TextInput',
	$dependencies : ['aria.widgets.controllers.DateController'],
	/**
	 * TextField constructor
	 * @param {aria.widgets.CfgBeans.TextFieldCfg} cfg the widget configuration
	 * @param {aria.templates.TemplateCtxt} ctxt template context
	 */
	$constructor : function (cfg, ctxt, lineNumber) {
		var controller = new aria.widgets.controllers.DateController();
		this.$TextInput.constructor.call(this, cfg, ctxt, lineNumber, controller);
		controller.setPattern(cfg.pattern);
		if (cfg.minValue) {
			controller.setMinValue(new Date(cfg.minValue));
		}
		if (cfg.maxValue) {
			controller.setMaxValue(new Date(cfg.maxValue));
		}
		if (cfg.referenceDate) {
			controller.setReferenceDate(new Date(cfg.referenceDate));
		}
	},
	$prototype : {

		/**
		 * Internal method called when one of the model property that the widget is bound to has changed Must be
		 * overridden by sub-classes defining bindable properties
		 * @param {String} propertyName the property name
		 * @param {Object} newValue the new value
		 * @param {Object} oldValue the old property value
		 * @protected
		 */
		_onBoundPropertyChange : function (propertyName, newValue, oldValue) {
			if (propertyName === 'referenceDate') {
				this.controller.setReferenceDate(newValue);
			} else {
				this.$TextInput._onBoundPropertyChange.call(this, propertyName, newValue, oldValue);
			}
		}
	}
});
