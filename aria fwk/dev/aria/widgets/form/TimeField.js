/*
 * Copyright Amadeus
 */
/**
 * @class aria.widgets.form.TimeField TimeField widget
 * @extends aria.widgets.form.TextInput
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.form.TimeField',
	$extends : 'aria.widgets.form.TextInput',
	$dependencies : ['aria.widgets.controllers.TimeController'],
	/**
	 * TimeField constructor
	 * @param{aria.widgets.CfgBeans.TextFieldCfg} cfg the widget configuration
	 * @param{aria.templates.TemplateCtxt} ctxt template context
	 */
	$constructor : function (cfg, ctxt, lineNumber) {
		var controller = new aria.widgets.controllers.TimeController(cfg);
		controller.setPattern(cfg.pattern);
		this.$TextInput.constructor.call(this, cfg, ctxt, lineNumber, controller);
	},
	$prototype : {}
});
