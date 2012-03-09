/*
 * Copyright Amadeus
 */
/**
 * @class aria.widgets.form.NumberField NumberField widget
 * @extends aria.widgets.form.TextInput
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.form.NumberField',
	$extends : 'aria.widgets.form.TextInput',
	$dependencies : ['aria.widgets.controllers.NumberController'],
	/**
	 * NumberField constructor
	 * @param{aria.widgets.CfgBeans.TextFieldCfg} cfg the widget configuration
	 * @param{aria.templates.TemplateCtxt} ctxt template context
	 */
	$constructor : function (cfg, ctxt, lineNumber) {
		var controller = new aria.widgets.controllers.NumberController();
		if (cfg.pattern) {
			controller.setPattern(cfg.pattern);
		}
		this.$TextInput.constructor.call(this, cfg, ctxt, lineNumber, controller);
	},
	$prototype : function () {}
});