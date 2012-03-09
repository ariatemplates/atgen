/*
 * Copyright Amadeus
 */
/**
 * Password widget
 * @class aria.widgets.form.PasswordField
 */
Aria.classDefinition({
	$classpath : 'aria.widgets.form.PasswordField',
	$extends : 'aria.widgets.form.TextInput',
	/**
	 * PasswordField constructor
	 * @param {aria.widgets.CfgBeans.TextFieldCfg} cfg the widget configuration
	 * @param {aria.templates.TemplateCtxt} ctxt template context
	 */
	$constructor : function (cfg, ctxt, lineNumber) {
		var controller = new aria.widgets.controllers.TextDataController();
		this.$TextInput.constructor.call(this, cfg, ctxt, lineNumber, controller);
		this._isPassword = true;
	},
	$prototype : {}
});
